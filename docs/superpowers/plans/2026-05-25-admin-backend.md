# Hostal Nómada — Admin Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Sirvoy webhook receiver, Vercel Postgres persistence layer, admin dashboard, and WhatsApp/email notifications for Hostal Nómada.

**Architecture:** Next.js API route at `/api/webhooks/sirvoy` receives Sirvoy POST events, validates a shared secret, upserts into Vercel Postgres, and triggers Resend (email) + Twilio (WhatsApp) on new bookings. Admin dashboard at `/admin` reads from Postgres and displays reservations, stats, and notification settings. Protected by NextAuth email/password.

**Tech Stack:** Vercel Postgres, NextAuth.js v5, Resend, Twilio, Recharts, Next.js 14 App Router

**Prerequisite:** Plan A (public site) must be complete. Run this plan on the same repo.

---

## File Map

```
lib/
  db.ts                           # Vercel Postgres client (singleton)
  schema.ts                       # TypeScript types for Booking
  bookings.ts                     # All DB queries (upsert, list, stats)
  notifications.ts                # Resend email + Twilio WhatsApp
  auth.ts                         # NextAuth config

app/
  api/
    webhooks/
      sirvoy/
        route.ts                  # POST handler — receive Sirvoy events
    auth/
      [...nextauth]/
        route.ts                  # NextAuth handlers
  admin/
    layout.tsx                    # Auth guard — redirects if not logged in
    page.tsx                      # /admin — today overview
    login/
      page.tsx                    # /admin/login
    reservas/
      page.tsx                    # /admin/reservas — full booking list
    estadisticas/
      page.tsx                    # /admin/estadisticas — charts
    notificaciones/
      page.tsx                    # /admin/notificaciones — settings

components/
  admin/
    TodayOverview.tsx             # Check-ins/outs today, occupancy, last 3 bookings
    BookingsTable.tsx             # Filterable table with status badges
    StatsCharts.tsx               # Recharts: revenue bar, occupancy line, source pie
    NotificationSettings.tsx      # Toggle email/WhatsApp, phone, email, test button
    BookingDetail.tsx             # Modal/drawer: full booking JSON

__tests__/
  api/webhooks/sirvoy.test.ts     # Webhook route unit tests
  lib/bookings.test.ts            # DB query tests (mocked)
  lib/notifications.test.ts       # Notification tests (mocked)
```

---

## Task 1: Database Setup

**Files:**
- Create: `lib/schema.ts`
- Create: `lib/db.ts`
- Create: `lib/bookings.ts`
- Create: `__tests__/lib/bookings.test.ts`

- [ ] **Step 1: Install dependencies**

```bash
npm install @vercel/postgres
npm install --save-dev @types/pg
```

- [ ] **Step 2: Add env vars to `.env.local`**

```bash
cat >> .env.local << 'EOF'
POSTGRES_URL=REPLACE_WITH_VERCEL_POSTGRES_URL
POSTGRES_PRISMA_URL=REPLACE_WITH_VERCEL_POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING=REPLACE_WITH_VERCEL_POSTGRES_NON_POOLING
POSTGRES_USER=REPLACE_WITH_USER
POSTGRES_HOST=REPLACE_WITH_HOST
POSTGRES_PASSWORD=REPLACE_WITH_PASSWORD
POSTGRES_DATABASE=REPLACE_WITH_DATABASE
SIRVOY_WEBHOOK_SECRET=REPLACE_WITH_RANDOM_SECRET
EOF
```

- [ ] **Step 3: Write failing test for bookings lib**

Create `__tests__/lib/bookings.test.ts`:

```typescript
import { parseBookingPayload } from '@/lib/bookings'

describe('parseBookingPayload', () => {
  const raw = {
    id: 'SRV-001',
    eventType: 'new',
    generatedAt: '2026-05-25T10:00:00Z',
    booking: {
      guestName: 'Juan Pérez',
      guestEmail: 'juan@example.com',
      guestPhone: '+18091234567',
      roomType: 'Cuarto Valle',
      checkIn: '2026-06-01',
      checkOut: '2026-06-03',
      totalPrice: 4800,
      currency: 'DOP',
      source: 'booking.com',
      status: 'confirmed',
    },
  }

  it('extracts sirvoy_id', () => {
    const result = parseBookingPayload(raw)
    expect(result.sirvoy_id).toBe('SRV-001')
  })

  it('extracts guest_name', () => {
    const result = parseBookingPayload(raw)
    expect(result.guest_name).toBe('Juan Pérez')
  })

  it('extracts check_in date', () => {
    const result = parseBookingPayload(raw)
    expect(result.check_in).toBe('2026-06-01')
  })

  it('extracts event_type', () => {
    const result = parseBookingPayload(raw)
    expect(result.event_type).toBe('new')
  })
})
```

- [ ] **Step 4: Run test — verify it fails**

```bash
npx jest __tests__/lib/bookings.test.ts --no-coverage
```

Expected: FAIL

- [ ] **Step 5: Create schema types**

Create `lib/schema.ts`:

```typescript
export type EventType = 'new' | 'modified' | 'canceled' | 'restored'

export interface Booking {
  id: number
  sirvoy_id: string
  event_type: EventType
  guest_name: string | null
  guest_email: string | null
  guest_phone: string | null
  room_type: string | null
  check_in: string | null      // ISO date string YYYY-MM-DD
  check_out: string | null     // ISO date string YYYY-MM-DD
  total_price: number | null
  currency: string | null
  source: string | null
  status: string | null
  generated_at: string | null
  created_at: string
  raw_json: Record<string, unknown>
}

export type BookingInsert = Omit<Booking, 'id' | 'created_at'>
```

- [ ] **Step 6: Create DB client**

Create `lib/db.ts`:

```typescript
import { sql } from '@vercel/postgres'

export { sql }

export async function createBookingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id            SERIAL PRIMARY KEY,
      sirvoy_id     VARCHAR(100) UNIQUE NOT NULL,
      event_type    VARCHAR(20) NOT NULL,
      guest_name    VARCHAR(200),
      guest_email   VARCHAR(200),
      guest_phone   VARCHAR(50),
      room_type     VARCHAR(100),
      check_in      DATE,
      check_out     DATE,
      total_price   DECIMAL(10,2),
      currency      VARCHAR(10),
      source        VARCHAR(100),
      status        VARCHAR(20),
      generated_at  TIMESTAMPTZ,
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      raw_json      JSONB
    )
  `
}
```

- [ ] **Step 7: Create bookings lib**

Create `lib/bookings.ts`:

```typescript
import { sql } from '@/lib/db'
import type { Booking, BookingInsert } from '@/lib/schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBookingPayload(raw: any): BookingInsert {
  const b = raw.booking ?? raw
  return {
    sirvoy_id: String(raw.id ?? raw.bookingId ?? ''),
    event_type: raw.eventType ?? raw.event_type ?? 'new',
    guest_name: b.guestName ?? b.guest_name ?? null,
    guest_email: b.guestEmail ?? b.guest_email ?? null,
    guest_phone: b.guestPhone ?? b.guest_phone ?? null,
    room_type: b.roomType ?? b.room_type ?? null,
    check_in: b.checkIn ?? b.check_in ?? null,
    check_out: b.checkOut ?? b.check_out ?? null,
    total_price: b.totalPrice ?? b.total_price ?? null,
    currency: b.currency ?? null,
    source: b.source ?? null,
    status: b.status ?? null,
    generated_at: raw.generatedAt ?? raw.generated_at ?? null,
    raw_json: raw,
  }
}

export async function upsertBooking(data: BookingInsert): Promise<void> {
  await sql`
    INSERT INTO bookings (
      sirvoy_id, event_type, guest_name, guest_email, guest_phone,
      room_type, check_in, check_out, total_price, currency,
      source, status, generated_at, raw_json
    ) VALUES (
      ${data.sirvoy_id}, ${data.event_type}, ${data.guest_name},
      ${data.guest_email}, ${data.guest_phone}, ${data.room_type},
      ${data.check_in}, ${data.check_out}, ${data.total_price},
      ${data.currency}, ${data.source}, ${data.status},
      ${data.generated_at}, ${JSON.stringify(data.raw_json)}
    )
    ON CONFLICT (sirvoy_id) DO UPDATE SET
      event_type   = EXCLUDED.event_type,
      guest_name   = EXCLUDED.guest_name,
      guest_email  = EXCLUDED.guest_email,
      guest_phone  = EXCLUDED.guest_phone,
      room_type    = EXCLUDED.room_type,
      check_in     = EXCLUDED.check_in,
      check_out    = EXCLUDED.check_out,
      total_price  = EXCLUDED.total_price,
      currency     = EXCLUDED.currency,
      source       = EXCLUDED.source,
      status       = EXCLUDED.status,
      generated_at = EXCLUDED.generated_at,
      raw_json     = EXCLUDED.raw_json
  `
}

export async function listBookings(limit = 100): Promise<Booking[]> {
  const { rows } = await sql<Booking>`
    SELECT * FROM bookings ORDER BY created_at DESC LIMIT ${limit}
  `
  return rows
}

export async function getTodayCheckIns(): Promise<Booking[]> {
  const { rows } = await sql<Booking>`
    SELECT * FROM bookings
    WHERE check_in = CURRENT_DATE AND status != 'canceled'
    ORDER BY created_at DESC
  `
  return rows
}

export async function getTodayCheckOuts(): Promise<Booking[]> {
  const { rows } = await sql<Booking>`
    SELECT * FROM bookings
    WHERE check_out = CURRENT_DATE AND status != 'canceled'
    ORDER BY created_at DESC
  `
  return rows
}

export async function getRevenueByMonth(): Promise<{ month: string; revenue: number }[]> {
  const { rows } = await sql<{ month: string; revenue: number }>`
    SELECT
      TO_CHAR(DATE_TRUNC('month', check_in), 'Mon YYYY') AS month,
      SUM(total_price) AS revenue
    FROM bookings
    WHERE status != 'canceled' AND check_in IS NOT NULL
    GROUP BY DATE_TRUNC('month', check_in)
    ORDER BY DATE_TRUNC('month', check_in)
    LIMIT 12
  `
  return rows
}

export async function getBookingsBySource(): Promise<{ source: string; count: number }[]> {
  const { rows } = await sql<{ source: string; count: number }>`
    SELECT
      COALESCE(source, 'directo') AS source,
      COUNT(*) AS count
    FROM bookings
    WHERE status != 'canceled'
    GROUP BY source
    ORDER BY count DESC
  `
  return rows
}
```

- [ ] **Step 8: Run tests**

```bash
npx jest __tests__/lib/bookings.test.ts --no-coverage
```

Expected: PASS (4 tests)

- [ ] **Step 9: Initialize DB table (run once)**

Create `scripts/init-db.ts`:

```typescript
import { createBookingsTable } from '../lib/db'

async function main() {
  await createBookingsTable()
  console.log('✅ bookings table created')
  process.exit(0)
}

main().catch(console.error)
```

Run:

```bash
npx tsx scripts/init-db.ts
```

Expected: "✅ bookings table created"

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: add DB schema, bookings lib, Vercel Postgres setup"
```

---

## Task 2: Sirvoy Webhook Endpoint

**Files:**
- Create: `app/api/webhooks/sirvoy/route.ts`
- Create: `__tests__/api/webhooks/sirvoy.test.ts`

- [ ] **Step 1: Write failing tests**

Create `__tests__/api/webhooks/sirvoy.test.ts`:

```typescript
import { POST, GET } from '@/app/api/webhooks/sirvoy/route'
import { NextRequest } from 'next/server'

// Mock dependencies
jest.mock('@/lib/bookings', () => ({
  parseBookingPayload: jest.fn((raw) => ({ sirvoy_id: raw.id, event_type: raw.eventType, ...raw })),
  upsertBooking: jest.fn().mockResolvedValue(undefined),
}))
jest.mock('@/lib/notifications', () => ({
  sendNewBookingNotification: jest.fn().mockResolvedValue(undefined),
}))

const WEBHOOK_SECRET = 'test-secret'
process.env.SIRVOY_WEBHOOK_SECRET = WEBHOOK_SECRET

function makeRequest(body: object, secret?: string) {
  return new NextRequest('http://localhost/api/webhooks/sirvoy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret ? { 'x-sirvoy-secret': secret } : {}),
    },
    body: JSON.stringify(body),
  })
}

describe('POST /api/webhooks/sirvoy', () => {
  it('returns 200 for valid request', async () => {
    const req = makeRequest({ id: 'SRV-001', eventType: 'new' }, WEBHOOK_SECRET)
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('returns 401 for missing secret', async () => {
    const req = makeRequest({ id: 'SRV-001', eventType: 'new' })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 401 for wrong secret', async () => {
    const req = makeRequest({ id: 'SRV-001', eventType: 'new' }, 'wrong-secret')
    const res = await POST(req)
    expect(res.status).toBe(401)
  })
})

describe('GET /api/webhooks/sirvoy', () => {
  it('returns 200 for health check', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npx jest __tests__/api/webhooks/sirvoy.test.ts --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Create webhook route**

Create `app/api/webhooks/sirvoy/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { parseBookingPayload, upsertBooking } from '@/lib/bookings'
import { sendNewBookingNotification } from '@/lib/notifications'

// Sirvoy health check — must return 200 OK on GET
export async function GET() {
  return NextResponse.json({ ok: true })
}

export async function POST(req: NextRequest) {
  // Validate shared secret
  const secret = req.headers.get('x-sirvoy-secret')
  if (!secret || secret !== process.env.SIRVOY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  try {
    const booking = parseBookingPayload(body)
    await upsertBooking(booking)

    // Send notifications only for new bookings
    if (booking.event_type === 'new') {
      // Fire and forget — don't block the 200 response
      sendNewBookingNotification(booking).catch(console.error)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Webhook processing error:', err)
    // Still return 200 to prevent Sirvoy from retrying on our errors
    return NextResponse.json({ ok: true, warning: 'Processing error logged' })
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npx jest __tests__/api/webhooks/sirvoy.test.ts --no-coverage
```

Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Sirvoy webhook endpoint with secret validation"
```

---

## Task 3: Notifications (Resend + Twilio)

**Files:**
- Create: `lib/notifications.ts`
- Create: `__tests__/lib/notifications.test.ts`

- [ ] **Step 1: Install dependencies**

```bash
npm install resend twilio
```

- [ ] **Step 2: Add env vars**

```bash
cat >> .env.local << 'EOF'
RESEND_API_KEY=REPLACE_WITH_RESEND_KEY
RESEND_FROM_EMAIL=reservas@hostalnomadard.com
NOTIFICATION_EMAIL=REPLACE_WITH_YOUR_EMAIL
TWILIO_ACCOUNT_SID=REPLACE_WITH_TWILIO_SID
TWILIO_AUTH_TOKEN=REPLACE_WITH_TWILIO_TOKEN
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
NOTIFICATION_WHATSAPP_TO=whatsapp:+1809XXXXXXX
NOTIFICATIONS_EMAIL_ENABLED=true
NOTIFICATIONS_WHATSAPP_ENABLED=true
EOF
```

- [ ] **Step 3: Write failing tests**

Create `__tests__/lib/notifications.test.ts`:

```typescript
import { formatWhatsAppMessage } from '@/lib/notifications'
import type { BookingInsert } from '@/lib/schema'

const mockBooking: BookingInsert = {
  sirvoy_id: 'SRV-001',
  event_type: 'new',
  guest_name: 'Juan Pérez',
  guest_email: 'juan@example.com',
  guest_phone: '+18091234567',
  room_type: 'Cuarto Valle',
  check_in: '2026-06-01',
  check_out: '2026-06-03',
  total_price: 4800,
  currency: 'DOP',
  source: 'booking.com',
  status: 'confirmed',
  generated_at: null,
  raw_json: {},
}

describe('formatWhatsAppMessage', () => {
  it('includes guest name', () => {
    const msg = formatWhatsAppMessage(mockBooking)
    expect(msg).toContain('Juan Pérez')
  })

  it('includes check-in date', () => {
    const msg = formatWhatsAppMessage(mockBooking)
    expect(msg).toContain('2026-06-01')
  })

  it('includes room type', () => {
    const msg = formatWhatsAppMessage(mockBooking)
    expect(msg).toContain('Cuarto Valle')
  })

  it('includes source', () => {
    const msg = formatWhatsAppMessage(mockBooking)
    expect(msg).toContain('booking.com')
  })

  it('includes price with currency', () => {
    const msg = formatWhatsAppMessage(mockBooking)
    expect(msg).toContain('DOP')
    expect(msg).toContain('4800')
  })
})
```

- [ ] **Step 4: Run tests — verify they fail**

```bash
npx jest __tests__/lib/notifications.test.ts --no-coverage
```

Expected: FAIL

- [ ] **Step 5: Create notifications lib**

Create `lib/notifications.ts`:

```typescript
import { Resend } from 'resend'
import twilio from 'twilio'
import type { BookingInsert } from '@/lib/schema'

export function formatWhatsAppMessage(booking: BookingInsert): string {
  return [
    '🏨 Nueva reserva — Hostal Nómada',
    `👤 ${booking.guest_name ?? 'Sin nombre'}`,
    `📅 Check-in: ${booking.check_in ?? '?'} | Check-out: ${booking.check_out ?? '?'}`,
    `🛏 ${booking.room_type ?? 'Habitación'}`,
    `💰 ${booking.currency ?? ''} ${booking.total_price ?? '?'}`,
    `📲 Fuente: ${booking.source ?? 'directa'}`,
  ].join('\n')
}

export async function sendWhatsAppNotification(booking: BookingInsert): Promise<void> {
  if (process.env.NOTIFICATIONS_WHATSAPP_ENABLED !== 'true') return

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.NOTIFICATION_WHATSAPP_TO ?? '',
    body: formatWhatsAppMessage(booking),
  })
}

export async function sendEmailNotification(booking: BookingInsert): Promise<void> {
  if (process.env.NOTIFICATIONS_EMAIL_ENABLED !== 'true') return

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'reservas@hostalnomadard.com',
    to: process.env.NOTIFICATION_EMAIL ?? '',
    subject: `Nueva reserva — ${booking.guest_name ?? 'Huésped'} | ${booking.check_in ?? '?'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #4E6B5A;">🏨 Nueva reserva — Hostal Nómada</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666;">Huésped</td><td><strong>${booking.guest_name ?? '—'}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td>${booking.guest_email ?? '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Teléfono</td><td>${booking.guest_phone ?? '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Habitación</td><td>${booking.room_type ?? '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Check-in</td><td>${booking.check_in ?? '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Check-out</td><td>${booking.check_out ?? '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Total</td><td><strong>${booking.currency ?? ''} ${booking.total_price ?? '—'}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Fuente</td><td>${booking.source ?? 'directa'}</td></tr>
        </table>
      </div>
    `,
  })
}

export async function sendNewBookingNotification(booking: BookingInsert): Promise<void> {
  await Promise.allSettled([
    sendEmailNotification(booking),
    sendWhatsAppNotification(booking),
  ])
}
```

- [ ] **Step 6: Run tests**

```bash
npx jest __tests__/lib/notifications.test.ts --no-coverage
```

Expected: PASS (5 tests)

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add Resend email + Twilio WhatsApp notifications"
```

---

## Task 4: NextAuth Admin Auth

**Files:**
- Create: `lib/auth.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/layout.tsx`

- [ ] **Step 1: Install NextAuth**

```bash
npm install next-auth@beta
```

- [ ] **Step 2: Add env vars**

```bash
cat >> .env.local << 'EOF'
NEXTAUTH_SECRET=REPLACE_WITH_RANDOM_32_CHAR_STRING
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=REPLACE_WITH_YOUR_EMAIL
ADMIN_PASSWORD_HASH=REPLACE_WITH_BCRYPT_HASH
EOF
```

Generate password hash:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your_password', 10).then(h => console.log(h))"
```

Install bcryptjs:

```bash
npm install bcryptjs && npm install --save-dev @types/bcryptjs
```

- [ ] **Step 3: Create auth config**

Create `lib/auth.ts`:

```typescript
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string

        if (!email || !password) return null
        if (email !== process.env.ADMIN_EMAIL) return null

        const hash = process.env.ADMIN_PASSWORD_HASH ?? ''
        const valid = await bcrypt.compare(password, hash)
        if (!valid) return null

        return { id: '1', email, name: 'Admin' }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: { strategy: 'jwt' },
})
```

- [ ] **Step 4: Create NextAuth route**

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from '@/lib/auth'
export const { GET, POST } = handlers
```

- [ ] **Step 5: Create login page**

Create `app/admin/login/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-nomada-cream flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-nomada-green mb-6 text-center">Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nomada-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nomada-green"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create admin layout with auth guard**

Create `app/admin/layout.tsx`:

```typescript
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-nomada-cream">
      <div className="bg-nomada-green text-white px-4 py-3 flex items-center justify-between">
        <span className="font-bold">🏨 Hostal Nómada — Admin</span>
        <nav className="flex gap-4 text-sm">
          <a href="/admin" className="hover:text-nomada-sage transition-colors">Hoy</a>
          <a href="/admin/reservas" className="hover:text-nomada-sage transition-colors">Reservas</a>
          <a href="/admin/estadisticas" className="hover:text-nomada-sage transition-colors">Stats</a>
          <a href="/admin/notificaciones" className="hover:text-nomada-sage transition-colors">Notificaciones</a>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
```

- [ ] **Step 7: Verify login works**

```bash
npm run dev
```

Visit http://localhost:3000/admin — verify redirect to `/admin/login`. Log in — verify redirect back to `/admin`.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add NextAuth admin authentication with login page"
```

---

## Task 5: Admin Today Dashboard

**Files:**
- Create: `app/admin/page.tsx`
- Create: `components/admin/TodayOverview.tsx`
- Create: `__tests__/components/admin/TodayOverview.test.tsx`

- [ ] **Step 1: Write failing test**

Create `__tests__/components/admin/TodayOverview.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { TodayOverview } from '@/components/admin/TodayOverview'
import type { Booking } from '@/lib/schema'

const mockBooking: Booking = {
  id: 1,
  sirvoy_id: 'SRV-001',
  event_type: 'new',
  guest_name: 'María García',
  guest_email: 'maria@example.com',
  guest_phone: null,
  room_type: 'Cuarto Valle',
  check_in: new Date().toISOString().split('T')[0],
  check_out: new Date().toISOString().split('T')[0],
  total_price: 2400,
  currency: 'DOP',
  source: 'airbnb',
  status: 'confirmed',
  generated_at: null,
  created_at: new Date().toISOString(),
  raw_json: {},
}

describe('TodayOverview', () => {
  it('renders check-in count', () => {
    render(<TodayOverview checkIns={[mockBooking]} checkOuts={[]} recentBookings={[]} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText(/check-in/i)).toBeInTheDocument()
  })

  it('renders guest name in recent bookings', () => {
    render(<TodayOverview checkIns={[]} checkOuts={[]} recentBookings={[mockBooking]} />)
    expect(screen.getByText('María García')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/components/admin/TodayOverview.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Create TodayOverview component**

Create `components/admin/TodayOverview.tsx`:

```typescript
import type { Booking } from '@/lib/schema'
import { LogIn, LogOut, CalendarCheck } from 'lucide-react'

interface TodayOverviewProps {
  checkIns: Booking[]
  checkOuts: Booking[]
  recentBookings: Booking[]
}

const statusColor: Record<string, string> = {
  new: 'bg-green-100 text-green-700',
  confirmed: 'bg-green-100 text-green-700',
  modified: 'bg-yellow-100 text-yellow-700',
  canceled: 'bg-red-100 text-red-700',
  restored: 'bg-blue-100 text-blue-700',
}

export function TodayOverview({ checkIns, checkOuts, recentBookings }: TodayOverviewProps) {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Hoy — {new Date().toLocaleDateString('es-DO', { weekday: 'long', day: 'numeric', month: 'long' })}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-nomada-sage-light">
          <div className="flex items-center gap-3 mb-2">
            <LogIn size={20} className="text-nomada-green" />
            <span className="text-gray-500 text-sm">Check-ins hoy</span>
          </div>
          <p className="text-4xl font-bold text-gray-900">{checkIns.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-nomada-sage-light">
          <div className="flex items-center gap-3 mb-2">
            <LogOut size={20} className="text-nomada-green" />
            <span className="text-gray-500 text-sm">Check-outs hoy</span>
          </div>
          <p className="text-4xl font-bold text-gray-900">{checkOuts.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-nomada-sage-light">
          <div className="flex items-center gap-3 mb-2">
            <CalendarCheck size={20} className="text-nomada-green" />
            <span className="text-gray-500 text-sm">Reservas recientes</span>
          </div>
          <p className="text-4xl font-bold text-gray-900">{recentBookings.length}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Últimas reservas</h2>
        <div className="space-y-3">
          {recentBookings.slice(0, 5).map((b) => (
            <div key={b.id} className="bg-white rounded-xl p-4 shadow-sm border border-nomada-sage-light flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{b.guest_name ?? 'Sin nombre'}</p>
                <p className="text-sm text-gray-500">{b.room_type} · {b.check_in} → {b.check_out}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 capitalize">{b.source ?? 'directa'}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[b.event_type] ?? 'bg-gray-100 text-gray-600'}`}>
                  {b.event_type}
                </span>
              </div>
            </div>
          ))}
          {recentBookings.length === 0 && (
            <p className="text-gray-500 text-sm">Sin reservas recientes.</p>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create admin today page**

Create `app/admin/page.tsx`:

```typescript
import { getTodayCheckIns, getTodayCheckOuts, listBookings } from '@/lib/bookings'
import { TodayOverview } from '@/components/admin/TodayOverview'

export default async function AdminPage() {
  const [checkIns, checkOuts, recentBookings] = await Promise.all([
    getTodayCheckIns(),
    getTodayCheckOuts(),
    listBookings(5),
  ])

  return <TodayOverview checkIns={checkIns} checkOuts={checkOuts} recentBookings={recentBookings} />
}
```

- [ ] **Step 5: Run tests**

```bash
npx jest __tests__/components/admin/TodayOverview.test.tsx --no-coverage
```

Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add admin today dashboard with check-ins/outs overview"
```

---

## Task 6: Admin Reservas Page

**Files:**
- Create: `app/admin/reservas/page.tsx`
- Create: `components/admin/BookingsTable.tsx`
- Create: `__tests__/components/admin/BookingsTable.test.tsx`

- [ ] **Step 1: Write failing test**

Create `__tests__/components/admin/BookingsTable.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { BookingsTable } from '@/components/admin/BookingsTable'
import type { Booking } from '@/lib/schema'

const bookings: Booking[] = [
  {
    id: 1,
    sirvoy_id: 'SRV-001',
    event_type: 'new',
    guest_name: 'Ana López',
    guest_email: 'ana@example.com',
    guest_phone: null,
    room_type: 'Cuarto Valle',
    check_in: '2026-06-01',
    check_out: '2026-06-03',
    total_price: 4800,
    currency: 'DOP',
    source: 'airbnb',
    status: 'confirmed',
    generated_at: null,
    created_at: '2026-05-25T10:00:00Z',
    raw_json: {},
  },
]

describe('BookingsTable', () => {
  it('renders guest name', () => {
    render(<BookingsTable bookings={bookings} />)
    expect(screen.getByText('Ana López')).toBeInTheDocument()
  })

  it('renders source', () => {
    render(<BookingsTable bookings={bookings} />)
    expect(screen.getByText('airbnb')).toBeInTheDocument()
  })

  it('renders price', () => {
    render(<BookingsTable bookings={bookings} />)
    expect(screen.getByText(/4800/)).toBeInTheDocument()
  })

  it('renders empty state when no bookings', () => {
    render(<BookingsTable bookings={[]} />)
    expect(screen.getByText(/sin reservas/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/components/admin/BookingsTable.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Create BookingsTable component**

Create `components/admin/BookingsTable.tsx`:

```typescript
'use client'

import { useState } from 'react'
import type { Booking } from '@/lib/schema'

const eventBadge: Record<string, string> = {
  new:       'bg-green-100 text-green-700',
  modified:  'bg-yellow-100 text-yellow-700',
  canceled:  'bg-red-100 text-red-700',
  restored:  'bg-blue-100 text-blue-700',
}

interface BookingsTableProps {
  bookings: Booking[]
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  const [search, setSearch] = useState('')
  const [filterSource, setFilterSource] = useState('all')

  const sources = ['all', ...Array.from(new Set(bookings.map((b) => b.source ?? 'directa')))]

  const filtered = bookings.filter((b) => {
    const matchSearch =
      !search ||
      b.guest_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.sirvoy_id.toLowerCase().includes(search.toLowerCase())
    const matchSource = filterSource === 'all' || (b.source ?? 'directa') === filterSource
    return matchSearch && matchSource
  })

  if (bookings.length === 0) {
    return <p className="text-gray-500 text-sm">Sin reservas registradas aún.</p>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Buscar huésped o ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-nomada-green"
        />
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nomada-green"
        >
          {sources.map((s) => (
            <option key={s} value={s}>{s === 'all' ? 'Todas las fuentes' : s}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-nomada-sage-light">
        <table className="w-full text-sm">
          <thead className="bg-nomada-sage-light text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Huésped</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Habitación</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Check-in</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Check-out</th>
              <th className="text-left px-4 py-3 font-medium">Total</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Fuente</th>
              <th className="text-left px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nomada-sage-light">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-nomada-cream transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{b.guest_name ?? '—'}</p>
                  <p className="text-xs text-gray-400">{b.sirvoy_id}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-600">{b.room_type ?? '—'}</td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-600">{b.check_in ?? '—'}</td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-600">{b.check_out ?? '—'}</td>
                <td className="px-4 py-3 font-medium">
                  {b.currency} {b.total_price ?? '—'}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-gray-600 capitalize">
                  {b.source ?? 'directa'}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${eventBadge[b.event_type] ?? 'bg-gray-100 text-gray-600'}`}>
                    {b.event_type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-8">Sin resultados.</p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create reservas page**

Create `app/admin/reservas/page.tsx`:

```typescript
import { listBookings } from '@/lib/bookings'
import { BookingsTable } from '@/components/admin/BookingsTable'

export default async function ReservasPage() {
  const bookings = await listBookings(500)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reservas</h1>
        <span className="text-sm text-gray-500">{bookings.length} total</span>
      </div>
      <BookingsTable bookings={bookings} />
    </div>
  )
}
```

- [ ] **Step 5: Run tests**

```bash
npx jest __tests__/components/admin/BookingsTable.test.tsx --no-coverage
```

Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add admin reservas page with filterable BookingsTable"
```

---

## Task 7: Admin Estadísticas Page

**Files:**
- Create: `app/admin/estadisticas/page.tsx`
- Create: `components/admin/StatsCharts.tsx`

- [ ] **Step 1: Install Recharts**

```bash
npm install recharts
```

- [ ] **Step 2: Create StatsCharts component**

Create `components/admin/StatsCharts.tsx`:

```typescript
'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

interface StatsChartsProps {
  revenueByMonth: { month: string; revenue: number }[]
  bookingsBySource: { source: string; count: number }[]
}

const COLORS = ['#4E6B5A', '#C8D4BF', '#3A5244', '#8FAB9B', '#2D4238']

export function StatsCharts({ revenueByMonth, bookingsBySource }: StatsChartsProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-nomada-sage-light">
        <h2 className="text-lg font-semibold mb-6">Ingresos por mes (DOP)</h2>
        {revenueByMonth.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">Sin datos aún.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EDE4" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => [`DOP ${v.toLocaleString()}`, 'Ingresos']} />
              <Bar dataKey="revenue" fill="#4E6B5A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-nomada-sage-light">
        <h2 className="text-lg font-semibold mb-6">Reservas por fuente</h2>
        {bookingsBySource.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">Sin datos aún.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={bookingsBySource}
                dataKey="count"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
              >
                {bookingsBySource.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create estadísticas page**

Create `app/admin/estadisticas/page.tsx`:

```typescript
import { getRevenueByMonth, getBookingsBySource } from '@/lib/bookings'
import { StatsCharts } from '@/components/admin/StatsCharts'

export default async function EstadisticasPage() {
  const [revenueByMonth, bookingsBySource] = await Promise.all([
    getRevenueByMonth(),
    getBookingsBySource(),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Estadísticas</h1>
      <StatsCharts
        revenueByMonth={revenueByMonth}
        bookingsBySource={bookingsBySource}
      />
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add admin estadisticas page with Recharts visualizations"
```

---

## Task 8: Admin Notificaciones Settings

**Files:**
- Create: `app/admin/notificaciones/page.tsx`
- Create: `app/api/admin/test-notification/route.ts`
- Create: `components/admin/NotificationSettings.tsx`

- [ ] **Step 1: Create test notification API route**

Create `app/api/admin/test-notification/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sendNewBookingNotification } from '@/lib/notifications'
import type { BookingInsert } from '@/lib/schema'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const testBooking: BookingInsert = {
    sirvoy_id: 'TEST-001',
    event_type: 'new',
    guest_name: 'Huésped de Prueba',
    guest_email: 'test@hostalnomadard.com',
    guest_phone: null,
    room_type: 'Cuarto Valle',
    check_in: new Date().toISOString().split('T')[0],
    check_out: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    total_price: 2400,
    currency: 'DOP',
    source: 'test',
    status: 'confirmed',
    generated_at: null,
    raw_json: {},
  }

  await sendNewBookingNotification(testBooking)
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Create NotificationSettings component**

Create `components/admin/NotificationSettings.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export function NotificationSettings() {
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleTest() {
    setTestStatus('loading')
    try {
      const res = await fetch('/api/admin/test-notification', { method: 'POST' })
      setTestStatus(res.ok ? 'success' : 'error')
    } catch {
      setTestStatus('error')
    }
    setTimeout(() => setTestStatus('idle'), 4000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-nomada-sage-light">
        <h2 className="font-semibold text-lg mb-1">Notificaciones de reserva</h2>
        <p className="text-sm text-gray-500 mb-6">
          Se activan automáticamente cuando Sirvoy registra una nueva reserva.
          Configura los valores en las variables de entorno de Vercel.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-nomada-sage-light">
            <div>
              <p className="font-medium">Email (Resend)</p>
              <p className="text-sm text-gray-500">
                Variable: <code className="bg-gray-100 px-1 rounded text-xs">NOTIFICATIONS_EMAIL_ENABLED</code>
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              process.env.NEXT_PUBLIC_EMAIL_ENABLED === 'true'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}>
              Configurable en Vercel
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-nomada-sage-light">
            <div>
              <p className="font-medium">WhatsApp (Twilio)</p>
              <p className="text-sm text-gray-500">
                Variable: <code className="bg-gray-100 px-1 rounded text-xs">NOTIFICATIONS_WHATSAPP_ENABLED</code>
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-500">
              Configurable en Vercel
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Button onClick={handleTest} disabled={testStatus === 'loading'} variant="outline">
            {testStatus === 'loading' && <Loader2 size={16} className="animate-spin mr-2" />}
            Enviar notificación de prueba
          </Button>

          {testStatus === 'success' && (
            <span className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle size={16} /> Enviado correctamente
            </span>
          )}
          {testStatus === 'error' && (
            <span className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle size={16} /> Error al enviar
            </span>
          )}
        </div>
      </div>

      <div className="bg-nomada-sage-light rounded-xl p-6 text-sm text-gray-700">
        <p className="font-semibold mb-2">Cómo configurar en Vercel:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Ve a tu proyecto en vercel.com</li>
          <li>Settings → Environment Variables</li>
          <li>Agrega las variables de Resend y Twilio</li>
          <li>Redeploy para que tomen efecto</li>
        </ol>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create notificaciones page**

Create `app/admin/notificaciones/page.tsx`:

```typescript
import { NotificationSettings } from '@/components/admin/NotificationSettings'

export default function NotificacionesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
      <NotificationSettings />
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add admin notificaciones page with test notification button"
```

---

## Task 9: Final Verification + Deploy

- [ ] **Step 1: Run all tests**

```bash
npx jest --no-coverage
```

Expected: all tests PASS. Note any failures and fix before proceeding.

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 3: Set Vercel env vars**

In vercel.com → Project → Settings → Environment Variables, add:

```
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER / HOST / PASSWORD / DATABASE
SIRVOY_WEBHOOK_SECRET
RESEND_API_KEY
RESEND_FROM_EMAIL
NOTIFICATION_EMAIL
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_FROM
NOTIFICATION_WHATSAPP_TO
NOTIFICATIONS_EMAIL_ENABLED=true
NOTIFICATIONS_WHATSAPP_ENABLED=true
NEXTAUTH_SECRET
NEXTAUTH_URL=https://hostalnomadard.com
ADMIN_EMAIL
ADMIN_PASSWORD_HASH
```

- [ ] **Step 4: Configure Sirvoy webhook**

In Sirvoy admin → Settings → Webhooks:
- URL: `https://hostalnomadard.com/api/webhooks/sirvoy`
- Secret header: `x-sirvoy-secret: <your SIRVOY_WEBHOOK_SECRET value>`
- Events: new, modified, canceled, restored

- [ ] **Step 5: Push and verify deploy**

```bash
git push origin main
```

Expected: Vercel deploys automatically.

- [ ] **Step 6: Smoke test production**

- Visit https://hostalnomadard.com — homepage loads
- Visit https://hostalnomadard.com/reservar — Sirvoy widget loads
- Visit https://hostalnomadard.com/admin — redirects to login
- Log in — dashboard loads
- Click "Enviar notificación de prueba" — email + WhatsApp arrive

---

## Completion Checklist

- [ ] All tests passing: `npx jest --no-coverage`
- [ ] Build succeeds: `npm run build`
- [ ] Webhook endpoint returns 200 on GET (Sirvoy health check)
- [ ] Webhook rejects requests without correct secret
- [ ] New bookings trigger email + WhatsApp
- [ ] `/admin` redirects to login when unauthenticated
- [ ] Admin today shows check-ins/outs
- [ ] Admin reservas table filters by name and source
- [ ] Admin stats renders charts
- [ ] Test notification button works
- [ ] Sirvoy webhook configured in Sirvoy admin panel
