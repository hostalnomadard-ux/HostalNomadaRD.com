# Hostal Nómada — Webapp + Sirvoy Integration Design

**Date:** 2026-05-25
**Status:** Approved

---

## 1. Overview

Build a SEO-friendly, brand-consistent website for **Hostal Nómada** (Santiago de los Caballeros, RD) that serves as the primary booking interface for guests, with Sirvoy as the invisible channel management engine behind it. A private admin dashboard receives booking webhooks from Sirvoy and displays real-time stats, notifications, and reservation history.

**Core principle:** Website = beautiful front-end. Sirvoy = invisible engine that syncs to all platforms automatically.

---

## 2. Property Details

| Field | Value |
|---|---|
| Name | Hostal Nómada |
| Address | #43 C. Máximo Gómez, Santiago de los Caballeros, RD |
| Coords | 19.4521542, -70.7066258 |
| Rating | 4.64 ⭐ (Airbnb) / 4.69 ⭐ (Hostelworld, 457 reviews) |
| Building | Colonial, +75 years, formerly a hospital |
| Check-in | 15:00–23:00 (smart lock) |
| Check-out | Until 11:00 |
| Pets | Welcome |
| Payment | Cash, Zelle, Dominican bank transfer |
| Languages | Spanish, English |

---

## 3. Architecture

```
Guest
  ↓
HostalNomadaRD.com (Next.js on Vercel)
  ├── Public pages (SEO)
  └── Sirvoy booking widget → booking confirmed
                                    ↓
                               Sirvoy (PMS / Channel Manager)
                               ├── Booking.com
                               ├── Expedia / Airbnb
                               ├── Hostelworld
                               ├── Google Hotel Search
                               └── POST webhook on every event
                                           ↓
                               /api/webhooks/sirvoy (Vercel Function)
                                           ↓
                                   Vercel Postgres (booking history)
                                   Vercel KV (cache)
                                           ↓
                               /admin (private dashboard)
                               + Email (Resend) + WhatsApp (Twilio)
```

---

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS |
| Database | Vercel Postgres |
| Cache | Vercel KV |
| Admin Auth | NextAuth.js (email/password) |
| Email | Resend |
| WhatsApp | Twilio |
| Charts | Recharts |
| Assets | Vercel Blob |
| Deploy | Vercel (auto on GitHub push) |

---

## 5. Design System

| Token | Value |
|---|---|
| Primary | `#4E6B5A` (forest green) |
| Secondary | `#C8D4BF` (sage) |
| Background | `#FFFFFF` / `#F8F7F4` |
| Font | Space Grotesk or Outfit (geometric, matches brand) |
| Logo | SVG from brand assets |
| Image treatment | Green overlay for consistency |

---

## 6. Public Pages

### `/` — Homepage
- Hero fullscreen: property photo, tagline, CTA "Reservar ahora"
- Rooms preview section (2 cards minimum: private, shared)
- Amenities grid: WiFi, AC, Smart lock, Pets, Parking, Towels, Hot shower, Common room
- Reviews carousel (real Airbnb reviews — 4 selected below)
- Location section: Google Maps embed + walking distance highlights
- Footer: address, WhatsApp, social links, Sirvoy booking CTA

**Real reviews to include:**
> *"¡Este lugar fue realmente excepcional! Excelente ubicación en el corazón de la ciudad... una sensación histórica."* — Landon, Arlington VA ⭐⭐⭐⭐⭐

> *"No solo me regaló una estadía bonita, sino que me permitió realizar un viaje hacia mi interior y vivir la experiencia de estar en una zona histórica."* — Ólfir, RD ⭐⭐⭐⭐⭐

> *"Lugar cómodo, seguro y limpio. Tiene bares, tiendas y restaurantes cerca."* — Harold, Santo Domingo ⭐⭐⭐⭐⭐

> *"Muy agradable y confortable, buen trato por parte de la anfitrión, siempre atenta y a la orden."* — Leny, RD ⭐⭐⭐⭐⭐

### `/habitaciones` — Rooms
- Grid layout: photo, room name, capacity, key amenities, price-from, "Reservar" button
- Known room: **Cuarto Valle** — private room, private bath, 2 guests, 1 bed, AC, smart lock

### `/reservar` — Book Now
- Sirvoy JS booking widget, full-width, no distractions
- Colors customized via CSS variables to match brand
- `<script async data-form-id="SIRVOY_ENGINE_ID" src="https://secured.sirvoy.com/widget/sirvoy.js"></script>`

### `/nosotros` — About
- Story: young couple + 2 dogs, 14 years hosting
- Building history: 75+ years, originally a hospital, restored
- Values: authentic, local, traveler-first

### `/contacto` — Contact
- Google Maps embed (coords: 19.4521542, -70.7066258)
- WhatsApp direct link
- Email contact form
- Address: #43 C. Máximo Gómez

---

## 7. SEO

- `metadata` export on every page (Next.js App Router)
- Schema.org `LodgingBusiness` JSON-LD on homepage with full address + coords
- Open Graph tags for social sharing
- Auto-generated `sitemap.xml` + `robots.txt`
- "Santiago de los Caballeros" mentioned naturally in hero and meta descriptions

---

## 8. Sirvoy Webhook Integration

### Endpoint
`POST /api/webhooks/sirvoy`

### Events received
| Event | Trigger |
|---|---|
| `new` | Booking created |
| `modified` | Booking updated |
| `canceled` | Booking canceled |
| `restored` | Canceled booking restored |

### Processing
1. Validate shared secret header
2. Parse JSON payload
3. Upsert into `bookings` table
4. Respond `200 OK` in < 1s (Sirvoy retries up to 10x with exponential backoff)
5. Trigger notifications (email + WhatsApp) on `new` events

### Requirements
- HTTPS only (TLS 1.2+)
- Respond to GET healthcheck with `200 OK`
- Handle out-of-order events using `generatedAt` timestamp

---

## 9. Database Schema

```sql
CREATE TABLE bookings (
  id            SERIAL PRIMARY KEY,
  sirvoy_id     VARCHAR(100) UNIQUE NOT NULL,
  event_type    VARCHAR(20) NOT NULL,   -- new | modified | canceled | restored
  guest_name    VARCHAR(200),
  guest_email   VARCHAR(200),
  guest_phone   VARCHAR(50),
  room_type     VARCHAR(100),
  check_in      DATE,
  check_out     DATE,
  total_price   DECIMAL(10,2),
  currency      VARCHAR(10),
  source        VARCHAR(100),           -- airbnb | booking.com | direct | hostelworld
  status        VARCHAR(20),
  generated_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  raw_json      JSONB
);
```

---

## 10. Admin Dashboard `/admin`

**Auth:** NextAuth.js — email/password, single user (owner).

### Pages

#### `/admin` — Today
- Check-ins today / Check-outs today
- Current occupancy %
- Last 3 bookings

#### `/admin/reservas` — All Bookings
- Filterable table: date range, source, status
- Click → full booking detail (guest info, amounts, notes)
- Status badges: 🟢 confirmed / 🟡 modified / 🔴 canceled

#### `/admin/estadisticas` — Stats
- Monthly revenue (bar chart)
- Monthly occupancy % (line chart)
- Bookings by source (pie chart): Airbnb / Booking.com / Hostelworld / Direct
- Top guest nationalities

#### `/admin/notificaciones` — Settings
- Email notifications toggle (Resend)
- WhatsApp notifications toggle (Twilio)
- Destination phone number
- Destination email
- "Send test" button for both channels

---

## 11. Notifications

### WhatsApp message format (on new booking)
```
🏨 Nueva reserva — Hostal Nómada
👤 [Guest Name]
📅 Check-in: [date] | Check-out: [date]
🛏 [Room type]
💰 [Currency] [Amount]
📲 Fuente: [Source]
```

### Email format (Resend)
- Subject: `Nueva reserva — [Guest Name] | [Check-in date]`
- HTML template with brand colors, same data as WhatsApp

---

## 12. Out of Scope (Phase 1)

- Price editing via API (Sirvoy has no write API — managed directly in Sirvoy UI)
- Custom booking engine (Sirvoy widget handles this)
- Blog / multilingual
- Payment processing (Sirvoy handles)
- Migration to open-API PMS (planned for Phase 2 if needed)

---

## 13. Deployment

- GitHub repo: `HostalNomadaRD.com`
- Vercel project connected to GitHub — auto deploy on push to `main`
- Environment variables: `SIRVOY_WEBHOOK_SECRET`, `DATABASE_URL`, `RESEND_API_KEY`, `TWILIO_*`, `NEXTAUTH_SECRET`
- Domain: `hostalnomadard.com`
