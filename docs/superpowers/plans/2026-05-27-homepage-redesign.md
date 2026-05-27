# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la homepage de Hostal Nómada con paleta tropical real (Verde Fresco + Royal Blue), layout editorial, narrativa histórica del edificio, integración de Cervecería Búcaro, y sección urbana nocturna.

**Architecture:** 8 componentes modificados + 3 componentes nuevos. Todos en `.worktrees/public-site/`. Tailwind v4 con `@theme` para tokens de color. Next.js App Router con Server Components. Sin estado del cliente salvo el menú móvil del Navbar.

**Tech Stack:** Next.js App Router · TypeScript · Tailwind CSS v4 · Lucide React · clsx · tailwind-merge

---

## File Map

| Acción | Archivo |
|---|---|
| Modify | `.worktrees/public-site/app/globals.css` |
| Modify | `.worktrees/public-site/components/ui/Button.tsx` |
| Modify | `.worktrees/public-site/components/layout/Navbar.tsx` |
| Modify | `.worktrees/public-site/components/layout/Footer.tsx` |
| Modify | `.worktrees/public-site/components/home/Hero.tsx` |
| Modify | `.worktrees/public-site/components/home/RoomsPreview.tsx` |
| Modify | `.worktrees/public-site/components/home/Amenities.tsx` |
| Modify | `.worktrees/public-site/components/home/Reviews.tsx` |
| Modify | `.worktrees/public-site/components/home/LocationSection.tsx` |
| Create | `.worktrees/public-site/components/home/ContextBar.tsx` |
| Create | `.worktrees/public-site/components/home/HistorySection.tsx` |
| Create | `.worktrees/public-site/components/home/NeighborhoodSection.tsx` |
| Create | `.worktrees/public-site/components/home/FinalCTA.tsx` |
| Modify | `.worktrees/public-site/app/page.tsx` |

---

## Task 1: Actualizar Design Tokens

**Files:**
- Modify: `.worktrees/public-site/app/globals.css`

Agrega nuevos tokens de color. Tailwind v4 usa `--color-*` en `@theme` → disponibles como `bg-verde-fresco`, `text-royal-blue`, etc. Mantén tokens existentes (otros pages los usan).

- [ ] **Step 1: Actualizar globals.css**

Reemplaza el contenido completo de `.worktrees/public-site/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* === Paleta original (mantener para otras páginas) === */
  --color-nomada-green: #4E6B5A;
  --color-nomada-green-dark: #3A5244;
  --color-nomada-sage: #C8D4BF;
  --color-nomada-sage-light: #E8EDE4;
  --color-nomada-cream: #F8F7F4;

  /* === Paleta nueva homepage === */
  --color-verde-fresco: #52B788;
  --color-verde-fresco-dark: #3D9A6E;
  --color-verde-fresco-light: #D4EFE2;
  --color-royal-blue: #2B5DB8;
  --color-royal-blue-dark: #1E4490;
  --color-royal-blue-light: #D0DCF5;
  --color-cream: #F5F0E8;
  --color-carbon: #1A1A1A;
  --color-blueprint-blue: #0A2463;

  --font-family-sans: var(--font-space-grotesk), system-ui, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-white text-gray-900 font-sans antialiased;
  }
}
```

- [ ] **Step 2: Verificar que el dev server compila sin errores**

```bash
cd .worktrees/public-site && npm run dev 2>&1 | head -20
```

Esperado: `✓ Ready` sin errores de CSS.

- [ ] **Step 3: Commit**

```bash
cd .worktrees/public-site
git add app/globals.css
git commit -m "style: add tropical color tokens — verde-fresco, royal-blue, carbon, cream"
```

---

## Task 2: Actualizar Button Component

**Files:**
- Modify: `.worktrees/public-site/components/ui/Button.tsx`

Agrega variantes `royal` y `outline-white` para los CTAs del hero y secciones oscuras.

- [ ] **Step 1: Reemplazar Button.tsx**

```tsx
import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'royal' | 'outline-white'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type ButtonAsLink = {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: React.ReactNode
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:       'bg-verde-fresco text-white hover:bg-verde-fresco-dark',
  outline:       'border-2 border-verde-fresco text-verde-fresco hover:bg-verde-fresco-light',
  ghost:         'text-verde-fresco hover:bg-verde-fresco-light',
  royal:         'bg-royal-blue text-white hover:bg-royal-blue-dark',
  'outline-white': 'border-2 border-white text-white hover:bg-white/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg font-semibold',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde-fresco disabled:opacity-50'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = twMerge(
    clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add royal and outline-white button variants"
```

---

## Task 3: Actualizar Navbar

**Files:**
- Modify: `.worktrees/public-site/components/layout/Navbar.tsx`

Agrega "Cervecería" al nav. Actualiza colores a verde-fresco. Agrega menú móvil funcional con estado.

- [ ] **Step 1: Reemplazar Navbar.tsx**

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/habitaciones', label: 'Habitaciones' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/cerveceria', label: 'Cervecería' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-verde-fresco" aria-hidden="true" />
          <span className="text-xl font-bold text-carbon tracking-wide uppercase">
            Hostal Nómada
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-carbon font-medium transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href="/reservar" size="md">
            Reservar
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-carbon"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 font-medium py-2 border-b border-gray-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/reservar" size="md" className="mt-2 w-full justify-center">
            Reservar
          </Button>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: update navbar — add Cervecería link, mobile menu, verde-fresco accent"
```

---

## Task 4: Reescribir Hero

**Files:**
- Modify: `.worktrees/public-site/components/home/Hero.tsx`

Hero full-bleed con fondo de imagen (placeholder color hasta tener foto real). Headline nuevo. Dual CTA. Rating strip.

- [ ] **Step 1: Reemplazar Hero.tsx**

```tsx
import { Button } from '@/components/ui/Button'
import { Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      {/* Fondo — reemplazar bg-carbon por next/image con foto de fachada cuando estén disponibles */}
      <div className="absolute inset-0 bg-carbon">
        {/* 
          TODO producción: reemplazar este div por:
          <Image src="/images/fachada-hostal-nomada.jpg" alt="Fachada Hostal Nómada" fill className="object-cover" priority />
        */}
        {/* Patrón sutil blueprint como placeholder */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg, #2B5DB8 0px, #2B5DB8 1px, transparent 1px, transparent 60px
            ), repeating-linear-gradient(
              90deg, #2B5DB8 0px, #2B5DB8 1px, transparent 1px, transparent 60px
            )`,
          }}
        />
      </div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-transparent" />

      {/* Contenido */}
      <div className="relative max-w-6xl mx-auto px-4 pb-16 pt-32 w-full">
        <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          Benito Monción esq. Máximo Gómez · Santiago, RD
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6 max-w-3xl">
          75 años en la calle más histórica de Santiago.
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
          Hostal boutique + Cervecería Búcaro en el centro histórico.
          Habitaciones privadas y compartidas con carácter.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Button size="lg" href="/reservar">
            Reservar habitación
          </Button>
          <Button size="lg" variant="outline-white" href="/cerveceria">
            Conoce la Cervecería →
          </Button>
        </div>

        {/* Rating strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white font-semibold">4.64</span>
            <span>Airbnb</span>
          </span>
          <span className="w-px h-4 bg-gray-600 hidden sm:block" />
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white font-semibold">4.69</span>
            <span>Hostelworld</span>
          </span>
          <span className="w-px h-4 bg-gray-600 hidden sm:block" />
          <span>457 reseñas</span>
          <span className="w-px h-4 bg-gray-600 hidden sm:block" />
          <span className="text-verde-fresco font-medium">🍺 Cervecería Búcaro</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "feat: rewrite Hero — dark cinematic, new headline, dual CTA, rating strip"
```

---

## Task 5: Crear ContextBar

**Files:**
- Create: `.worktrees/public-site/components/home/ContextBar.tsx`

Barra royal-blue bajo el hero con trust signals en una línea.

- [ ] **Step 1: Crear ContextBar.tsx**

```tsx
const signals = [
  '📍 Centro Histórico',
  '🍺 Cervecería Búcaro',
  '🔐 Smart Lock 24h',
  '🐾 Mascotas OK',
  '✔ 14 años de anfitriones',
  '💳 Check-in 15:00–23:00',
]

export function ContextBar() {
  return (
    <div className="bg-royal-blue py-3 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-white/90 text-sm font-medium">
          {signals.map((s, i) => (
            <span key={i} className="whitespace-nowrap">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/ContextBar.tsx
git commit -m "feat: add ContextBar — royal-blue trust signals strip"
```

---

## Task 6: Crear HistorySection

**Files:**
- Create: `.worktrees/public-site/components/home/HistorySection.tsx`

Sección editorial split: foto izquierda / texto derecha. Narrativa del Dr. Jiménez Almonte. Motivo blueprint como fondo sutil. Pull quote grande.

- [ ] **Step 1: Crear HistorySection.tsx**

```tsx
export function HistorySection() {
  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Foto / Imagen del edificio */}
          <div className="relative order-2 lg:order-1">
            {/* 
              TODO producción: reemplazar por next/image con foto del edificio
              <Image src="/images/edificio-exterior.jpg" alt="Fachada Art Déco 1948" fill className="object-cover rounded-2xl" />
            */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-carbon flex items-end">
              {/* Blueprint pattern como arte placeholder */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `
                    repeating-linear-gradient(0deg, #2B5DB8 0px, #2B5DB8 1px, transparent 1px, transparent 40px),
                    repeating-linear-gradient(90deg, #2B5DB8 0px, #2B5DB8 1px, transparent 1px, transparent 40px)
                  `,
                  backgroundColor: '#0A2463',
                }}
              />
              <div className="relative p-8 text-white/70 text-xs font-mono leading-relaxed">
                Proyecto: Consultoría y Residencia<br />
                Arq. Pablo N. Pérez Rancier<br />
                Santiago, R.D. — Mayo 1, 1948
              </div>
            </div>

            {/* Badge patrimonio */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 text-xs font-medium text-carbon border border-gray-100">
              <p className="text-verde-fresco font-bold text-sm">Patrimonio</p>
              <p className="text-gray-500">Guía de Arquitectura · Pág. 105</p>
            </div>
          </div>

          {/* Texto editorial */}
          <div className="order-1 lg:order-2">
            <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Construido en 1948 · Art Déco caribeño
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-carbon leading-tight mb-6">
              De consultorio a punto de encuentro.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              El arquitecto <strong className="text-carbon">Pablo N. Pérez Rancier</strong> diseñó este edificio
              para el <strong className="text-carbon">Dr. José de Jesús Jiménez Almonte</strong> — médico
              internista, botánico reconocido y campeón nacional de ajedrez.
            </p>

            <p className="text-gray-600 leading-relaxed mb-10">
              Aquí vivió, trabajó y escribió parte de la flora dominicana. En su terraza,
              Santiago debatía ciencia y movía piezas de ajedrez. La <em>Tolumnia jimenezii</em>,
              una orquídea endémica, lleva su nombre.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-verde-fresco pl-6 py-2 mb-10">
              <p className="text-carbon text-xl font-bold leading-snug italic">
                "Un médico que curaba corazones.<br />
                Un botánico que nombraba orquídeas.<br />
                Esta fue su casa. Ahora es la tuya."
              </p>
            </blockquote>

            {/* Timeline mini */}
            <div className="flex flex-col gap-3">
              {[
                { year: '1948', event: 'Construcción — Arq. Pérez Rancier diseña consultoría + residencia' },
                { year: '1966', event: 'El Dr. Jiménez funda la primera unidad de cardiología en Santiago' },
                { year: '1980', event: 'Premio Nacional de Ciencias de la República Dominicana' },
                { year: 'Hoy', event: 'Hostal Nómada + Cervecería Búcaro · El espíritu de encuentro continúa' },
              ].map(({ year, event }) => (
                <div key={year} className="flex gap-4 items-start">
                  <span className="text-xs font-bold text-verde-fresco w-10 shrink-0 pt-0.5">{year}</span>
                  <span className="text-sm text-gray-600">{event}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/HistorySection.tsx
git commit -m "feat: add HistorySection — editorial split con narrativa Dr. Jiménez y timeline"
```

---

## Task 7: Actualizar RoomsPreview

**Files:**
- Modify: `.worktrees/public-site/components/home/RoomsPreview.tsx`

Cards más impactantes: foto prominent, badge coloreado, CTA royal-blue.

- [ ] **Step 1: Reemplazar RoomsPreview.tsx**

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Users, Bath, Wind, Lock } from 'lucide-react'

const rooms = [
  {
    id: 'valle',
    name: 'Cuarto Valle',
    type: 'Privado',
    description:
      'Cama matrimonial, decoración colonial minimalista con detalles azules. Baño privado con ducha caliente.',
    capacity: 2,
    bath: 'Privado',
    priceFrom: 'Desde DOP 2,400',
    priceSub: '≈ $40 USD / noche',
    color: 'bg-verde-fresco',
  },
  {
    id: 'compartida',
    name: 'Habitación Compartida',
    type: 'Compartido',
    description:
      'Literas en ambiente social. Áreas comunes diseñadas para conocer gente y vivir la experiencia hostal.',
    capacity: 4,
    bath: 'Compartido',
    priceFrom: 'Desde DOP 900',
    priceSub: '≈ $15 USD / noche',
    color: 'bg-royal-blue',
  },
]

export function RoomsPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Habitaciones
            </p>
            <h2 className="text-4xl font-bold text-carbon">
              Elige tu espacio.
            </h2>
          </div>
          <Link
            href="/habitaciones"
            className="text-royal-blue font-semibold text-sm hover:underline shrink-0"
          >
            Ver todas las habitaciones →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Foto placeholder — reemplazar con next/image en producción */}
              <div className={`h-60 ${room.color} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,_white_1px,_transparent_1px)] bg-[size:30px_30px]" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {room.type}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-carbon">{room.name}</h3>
                  <div className="text-right">
                    <p className="text-carbon font-bold text-sm">{room.priceFrom}</p>
                    <p className="text-gray-400 text-xs">{room.priceSub}</p>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{room.description}</p>

                <div className="flex gap-4 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1">
                    <Users size={13} />
                    {room.capacity} huéspedes
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={13} />
                    Baño {room.bath}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind size={13} />
                    AC
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock size={13} />
                    Smart Lock
                  </span>
                </div>

                <Button variant="royal" size="sm" href="/reservar">
                  Reservar →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/RoomsPreview.tsx
git commit -m "feat: update RoomsPreview — bold cards, royal-blue CTA, nuevo copy"
```

---

## Task 8: Actualizar Amenities

**Files:**
- Modify: `.worktrees/public-site/components/home/Amenities.tsx`

Fondo cream, iconos royal-blue, cervecería como amenidad destacada.

- [ ] **Step 1: Reemplazar Amenities.tsx**

```tsx
import { Wifi, Wind, Lock, PawPrint, Car, Shirt, Droplets, Users, Beer } from 'lucide-react'

const amenities = [
  { icon: Wifi, label: 'WiFi Gratis', highlight: false },
  { icon: Wind, label: 'Aire Acondicionado', highlight: false },
  { icon: Lock, label: 'Smart Lock 24h', highlight: false },
  { icon: PawPrint, label: 'Mascotas OK', highlight: false },
  { icon: Car, label: 'Estacionamiento', highlight: false },
  { icon: Shirt, label: 'Toallas y Sábanas', highlight: false },
  { icon: Droplets, label: 'Ducha Caliente', highlight: false },
  { icon: Users, label: 'Sala Común', highlight: false },
  { icon: Beer, label: 'Cervecería Búcaro', highlight: true },
]

export function Amenities() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Incluido
          </p>
          <h2 className="text-4xl font-bold text-carbon">Todo lo que necesitas.</h2>
          <p className="text-gray-500 mt-3 text-lg">Sin sorpresas. Sin extras ocultos.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map(({ icon: Icon, label, highlight }) => (
            <div
              key={label}
              className={`flex flex-col items-center text-center p-5 rounded-xl transition-colors ${
                highlight
                  ? 'bg-royal-blue text-white shadow-md'
                  : 'bg-white hover:bg-verde-fresco-light text-carbon'
              }`}
            >
              <Icon
                size={26}
                className={`mb-3 ${highlight ? 'text-white' : 'text-royal-blue'}`}
              />
              <span className={`text-sm font-medium ${highlight ? 'text-white' : 'text-gray-700'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Amenities.tsx
git commit -m "feat: update Amenities — cream bg, royal-blue icons, Cervecería Búcaro highlighted"
```

---

## Task 9: Crear NeighborhoodSection

**Files:**
- Create: `.worktrees/public-site/components/home/NeighborhoodSection.tsx`

Sección oscura (carbon) con energía nocturna. Lista de proximidades con distancias. Reemplaza LocationSection en la homepage (LocationSection se mantiene en /contacto).

- [ ] **Step 1: Crear NeighborhoodSection.tsx**

```tsx
import { MapPin } from 'lucide-react'

const places = [
  { emoji: '🍻', distance: '1 min', name: 'Bares de Benito Monción', detail: 'en tu puerta' },
  { emoji: '🍽️', distance: '2 min', name: 'Mejores restaurantes del centro', detail: 'a pie' },
  { emoji: '🏛️', distance: '2 min', name: 'Monumento a los Héroes', detail: 'caminando' },
  { emoji: '🌳', distance: '5 min', name: 'Parque Duarte', detail: 'a pie' },
  { emoji: '🏦', distance: '3 min', name: 'Banco, farmacia, supermercado', detail: 'a pie' },
  { emoji: '✈️', distance: '25 min', name: 'Aeropuerto Internacional Cibao', detail: 'en taxi' },
]

export function NeighborhoodSection() {
  return (
    <section className="py-20 bg-carbon">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div>
            <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Ubicación
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              A pasos de todo.
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Estás en el corazón del centro histórico.
              No en las afueras.
            </p>

            <div className="flex flex-col gap-4">
              {places.map(({ emoji, distance, name, detail }) => (
                <div key={name} className="flex items-center gap-4">
                  <span className="text-xl w-8 text-center shrink-0">{emoji}</span>
                  <div className="flex items-baseline gap-2 flex-1">
                    <span className="text-verde-fresco font-bold text-sm w-14 shrink-0">
                      {distance}
                    </span>
                    <span className="text-white font-medium text-sm">{name}</span>
                    <span className="text-gray-500 text-xs ml-1">{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa embed */}
          <div className="rounded-2xl overflow-hidden h-80 lg:h-96 opacity-90">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8!2d-70.7066258!3d19.4521542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1cf61a5f6a4ed%3A0xc4a749097ca77d4a!2sHostal%20N%C3%B3mada%20-%20Santiago%20de%20los%20Caballeros!5e0!3m2!1ses!2sdo!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) contrast(110%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Hostal Nómada"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/NeighborhoodSection.tsx
git commit -m "feat: add NeighborhoodSection — carbon bg, distances list, map embed"
```

---

## Task 10: Actualizar Reviews

**Files:**
- Modify: `.worktrees/public-site/components/home/Reviews.tsx`

Layout editorial: 3 cards sobre fondo cream. Sin dark-green monótono.

- [ ] **Step 1: Reemplazar Reviews.tsx**

```tsx
import { Star } from 'lucide-react'

const reviews = [
  {
    author: 'Landon',
    location: 'Arlington, Virginia',
    rating: 5,
    text: '"Una sensación histórica del lugar que hizo que uno se sintiera bastante privilegiado de quedarse allí. Excelente comunicación y flexibilidad de los anfitriones."',
    date: 'Dic 2025',
    source: 'Airbnb',
  },
  {
    author: 'Ólfir',
    location: 'San Francisco de Macorís, RD',
    rating: 5,
    text: '"No solo me regaló una estadía bonita, sino que me permitió realizar un viaje hacia mi interior y vivir la experiencia de estar en una zona histórica."',
    date: 'Abr 2026',
    source: 'Airbnb',
  },
  {
    author: 'Harold',
    location: 'Santo Domingo, RD',
    rating: 5,
    text: '"Lugar cómodo, seguro y limpio. Tiene bares, tiendas y restaurantes cerca. Muy conforme con las atenciones."',
    date: 'Nov 2025',
    source: 'Airbnb',
  },
]

export function Reviews() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Reseñas
          </p>
          <h2 className="text-4xl font-bold text-carbon">
            Lo que dicen nuestros huéspedes.
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <strong className="text-carbon">4.64</strong> Airbnb
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <strong className="text-carbon">4.69</strong> Hostelworld
            </span>
            <span className="text-gray-300">·</span>
            <span>457 reseñas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.author + review.date}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              {/* Estrellas */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Texto */}
              <p className="text-gray-700 leading-relaxed text-sm flex-1 italic mb-6">
                {review.text}
              </p>

              {/* Autor */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-bold text-carbon text-sm">{review.author}</p>
                  <p className="text-gray-400 text-xs">{review.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{review.date}</p>
                  <p className="text-xs text-verde-fresco font-medium">{review.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Reviews.tsx
git commit -m "feat: update Reviews — editorial cards on cream, 3-column, sin dark-green"
```

---

## Task 11: Crear FinalCTA

**Files:**
- Create: `.worktrees/public-site/components/home/FinalCTA.tsx`

Split CTA: izquierda verde (hostal) / derecha azul (cervecería).

- [ ] **Step 1: Crear FinalCTA.tsx**

```tsx
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">

      {/* Hostal — Verde */}
      <div className="bg-verde-fresco px-8 py-16 flex flex-col items-center text-center gap-6">
        <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
          Hostal Nómada
        </p>
        <h3 className="text-3xl font-bold text-white leading-tight">
          Reserva tu cuarto.<br />
          <span className="text-white/80 font-normal text-xl">Desde DOP 900 / noche.</span>
        </h3>
        <Button variant="outline-white" size="lg" href="/reservar">
          Ver disponibilidad →
        </Button>
      </div>

      {/* Cervecería — Azul */}
      <div className="bg-royal-blue px-8 py-16 flex flex-col items-center text-center gap-6">
        <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
          Cervecería Búcaro
        </p>
        <h3 className="text-3xl font-bold text-white leading-tight">
          Tómate una.<br />
          <span className="text-white/80 font-normal text-xl">En el mismo edificio.</span>
        </h3>
        <Button variant="outline-white" size="lg" href="/cerveceria">
          Conoce Búcaro →
        </Button>
      </div>

    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/FinalCTA.tsx
git commit -m "feat: add FinalCTA — split verde/azul, Hostal + Cervecería"
```

---

## Task 12: Actualizar Footer

**Files:**
- Modify: `.worktrees/public-site/components/layout/Footer.tsx`

Fondo carbon. Dirección correcta. WhatsApp botón. Link Cervecería.

- [ ] **Step 1: Reemplazar Footer.tsx**

```tsx
import Link from 'next/link'
import { MapPin, MessageCircle } from 'lucide-react'

const navLinks = [
  ['/habitaciones', 'Habitaciones'],
  ['/reservar', 'Reservar'],
  ['/cerveceria', 'Cervecería Búcaro'],
  ['/nosotros', 'Nosotros'],
  ['/contacto', 'Contacto'],
]

export function Footer() {
  return (
    <footer className="bg-carbon text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-verde-fresco" />
            <h3 className="text-white font-bold text-base uppercase tracking-wider">
              Hostal Nómada
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-2">
            Edificio Art Déco de 1948 en el corazón histórico de Santiago, RD.
          </p>
          <p className="text-xs text-gray-600">
            ⭐ 4.64 Airbnb · 4.69 Hostelworld
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
            Contacto
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-verde-fresco" />
              <span>C/ Benito Monción 29, esq. Máximo Gómez 34<br />Centro Histórico, Santiago, RD</span>
            </li>
            <li>
              <a
                href="https://wa.me/18091234567"
                className="flex items-center gap-2 text-verde-fresco hover:text-white transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={15} />
                WhatsApp directo
              </a>
            </li>
          </ul>
        </div>

        {/* Nav */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
            Explorar
          </h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="border-t border-white/5 text-center py-5 text-xs text-gray-600">
        © {new Date().getFullYear()} Hostal Nómada · Cervecería Búcaro. Santiago de los Caballeros, RD.
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: update Footer — carbon bg, dirección correcta, WhatsApp CTA, Cervecería link"
```

---

## Task 13: Actualizar page.tsx

**Files:**
- Modify: `.worktrees/public-site/app/page.tsx`

Conectar todos los componentes en el orden correcto. Quitar LocationSection del homepage (pasa a /contacto).

- [ ] **Step 1: Reemplazar app/page.tsx**

```tsx
import type { Metadata } from 'next'
import { lodgingSchema } from '@/lib/seo'
import { Hero } from '@/components/home/Hero'
import { ContextBar } from '@/components/home/ContextBar'
import { HistorySection } from '@/components/home/HistorySection'
import { RoomsPreview } from '@/components/home/RoomsPreview'
import { Amenities } from '@/components/home/Amenities'
import { NeighborhoodSection } from '@/components/home/NeighborhoodSection'
import { Reviews } from '@/components/home/Reviews'
import { FinalCTA } from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'Hostal Nómada — Santiago de los Caballeros, RD',
  description:
    'Hostal boutique en edificio Art Déco de 1948. Habitaciones privadas y compartidas en el centro histórico de Santiago de los Caballeros, RD. Cervecería Búcaro en el mismo espacio.',
  openGraph: {
    title: 'Hostal Nómada — Santiago de los Caballeros, RD',
    description:
      'Edificio Art Déco de 1948 en el corazón histórico de Santiago, RD. Hostal + Cervecería Búcaro.',
    url: 'https://hostalnomadard.com',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
      />
      <Hero />
      <ContextBar />
      <HistorySection />
      <RoomsPreview />
      <Amenities />
      <NeighborhoodSection />
      <Reviews />
      <FinalCTA />
    </>
  )
}
```

- [ ] **Step 2: Verificar que el build compila sin errores TypeScript**

```bash
cd .worktrees/public-site && npx tsc --noEmit 2>&1
```

Esperado: sin errores.

- [ ] **Step 3: Verificar que el dev server muestra la página correctamente**

```bash
npm run dev
```

Abrir `http://localhost:3000` y verificar:
- Hero con fondo oscuro y headline nuevo
- ContextBar azul bajo el hero
- Sección historia editorial
- Cards de habitaciones con botones azules
- Amenidades en cream con cervecería destacada
- Sección de barrio oscura con lista de distancias
- Reviews en 3 columnas sobre cream
- Split CTA verde/azul
- Footer carbon

- [ ] **Step 4: Commit final**

```bash
git add app/page.tsx
git commit -m "feat: wire up redesigned homepage — Hero→ContextBar→History→Rooms→Amenities→Neighborhood→Reviews→FinalCTA"
```

---

## Self-Review

**Spec coverage:**
- ✅ §2 Paleta → Task 1
- ✅ §3 Tipografía → Task 1 (font variable)
- ✅ §4.① Navbar → Task 3
- ✅ §4.② Hero → Task 4
- ✅ §4.③ ContextBar → Task 5
- ✅ §4.④ Historia → Task 6
- ✅ §4.⑤ Rooms → Task 7
- ✅ §4.⑥ Amenidades → Task 8
- ✅ §4.⑦ Barrio → Task 9
- ✅ §4.⑧ Reviews → Task 10
- ✅ §4.⑨ FinalCTA → Task 11
- ✅ §4.⑩ Footer → Task 12
- ✅ §5 Blueprint motif → Task 6 (pattern en HistorySection)

**Placeholders knowingly left:**
- Fotos reales: cada componente tiene `TODO producción` comment con instrucción exacta para reemplazar el placeholder div con `next/image`
- WhatsApp number en Footer: `18091234567` — reemplazar con número real

**Type consistency:** Button `variant` type incluye `'royal'` y `'outline-white'` en Task 2, usados en Tasks 4, 7, 11, 12. ✅
