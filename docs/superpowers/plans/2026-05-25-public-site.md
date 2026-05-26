# Hostal Nómada — Public Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the SEO-friendly public website for Hostal Nómada with brand design system, 5 public pages, and the embedded Sirvoy booking widget.

**Architecture:** Next.js 14 App Router deployed on Vercel. Static pages with server-side metadata for SEO. Sirvoy booking engine embedded via JS script tag on `/reservar`. Brand colors (forest green `#4E6B5A` + sage `#C8D4BF`) applied via Tailwind config.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Space Grotesk (Google Fonts), Vercel

---

## File Map

```
app/
  layout.tsx                  # Root layout — font, global metadata, Navbar + Footer
  page.tsx                    # / Homepage
  habitaciones/page.tsx       # /habitaciones — rooms grid
  reservar/page.tsx           # /reservar — Sirvoy widget
  nosotros/page.tsx           # /nosotros — about
  contacto/page.tsx           # /contacto — map + WhatsApp
  sitemap.ts                  # Auto-generated sitemap.xml
  robots.ts                   # robots.txt
components/
  layout/
    Navbar.tsx                # Logo + nav links + "Reservar" CTA button
    Footer.tsx                # Address, WhatsApp, social, copyright
  home/
    Hero.tsx                  # Fullscreen hero with CTA
    RoomsPreview.tsx          # 2-card rooms teaser
    Amenities.tsx             # Icon grid of amenities
    Reviews.tsx               # Carousel of 4 real reviews
    LocationSection.tsx       # Google Maps embed + highlights
  rooms/
    RoomCard.tsx              # Reusable card: photo, name, capacity, price, CTA
  ui/
    Button.tsx                # Reusable button (variants: primary, outline, ghost)
    SectionTitle.tsx          # H2 + optional subtitle, consistent spacing
  SirvoyWidget.tsx            # Client component wrapping the Sirvoy script
styles/
  globals.css                 # Tailwind directives + base overrides
tailwind.config.ts            # Brand colors + Space Grotesk font
next.config.ts                # Image domains, env
public/
  logo.svg                    # Brand logo (SVG)
```

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `.env.local`, `.gitignore`

- [ ] **Step 1: Bootstrap Next.js project**

```bash
cd /Users/javierestevez/Documents/GitHub/HostalNomadaRD.com
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
```

Expected: project scaffold created, `package.json` exists.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install @next/font lucide-react clsx tailwind-merge
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @types/jest
```

- [ ] **Step 3: Configure Jest**

Create `jest.config.ts`:

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Create `.env.local`**

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SIRVOY_ENGINE_ID=REPLACE_WITH_YOUR_ENGINE_ID
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=REPLACE_WITH_YOUR_KEY
NEXT_PUBLIC_SITE_URL=https://hostalnomadard.com
EOF
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: server running at http://localhost:3000, no errors.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js 14 project with TypeScript and Tailwind"
```

---

## Task 2: Design System — Tailwind + Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `styles/globals.css`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/SectionTitle.tsx`
- Create: `__tests__/components/ui/Button.test.tsx`

- [ ] **Step 1: Write failing test for Button component**

Create `__tests__/components/ui/Button.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Reservar</Button>)
    expect(screen.getByText('Reservar')).toBeInTheDocument()
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Click</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('bg-nomada-green')
  })

  it('applies outline variant classes', () => {
    render(<Button variant="outline">Click</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('border-nomada-green')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/components/ui/Button.test.tsx --no-coverage
```

Expected: FAIL — "Cannot find module '@/components/ui/Button'"

- [ ] **Step 3: Configure Tailwind with brand tokens**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nomada-green': '#4E6B5A',
        'nomada-green-dark': '#3A5244',
        'nomada-sage': '#C8D4BF',
        'nomada-sage-light': '#E8EDE4',
        'nomada-cream': '#F8F7F4',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Update globals.css**

Replace `styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-white text-gray-900 font-sans antialiased;
  }
}
```

- [ ] **Step 5: Create Button component**

Create `components/ui/Button.tsx`:

```typescript
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-nomada-green text-white hover:bg-nomada-green-dark',
  outline: 'border-2 border-nomada-green text-nomada-green hover:bg-nomada-sage-light',
  ghost: 'text-nomada-green hover:bg-nomada-sage-light',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nomada-green disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 6: Create SectionTitle component**

Create `components/ui/SectionTitle.tsx`:

```typescript
interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export function SectionTitle({ title, subtitle, centered = false, light = false }: SectionTitleProps) {
  return (
    <div className={clsx('mb-10', centered && 'text-center')}>
      <h2 className={clsx('text-3xl md:text-4xl font-bold', light ? 'text-white' : 'text-gray-900')}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx('mt-3 text-lg', light ? 'text-nomada-sage' : 'text-gray-600')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
```

Add missing import to `SectionTitle.tsx`:

```typescript
import { clsx } from 'clsx'
```

- [ ] **Step 7: Run tests — verify they pass**

```bash
npx jest __tests__/components/ui/Button.test.tsx --no-coverage
```

Expected: PASS (3 tests)

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add design system — Tailwind brand tokens, Button, SectionTitle"
```

---

## Task 3: Root Layout + Navbar + Footer

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `__tests__/components/layout/Navbar.test.tsx`

- [ ] **Step 1: Write failing test for Navbar**

Create `__tests__/components/layout/Navbar.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

describe('Navbar', () => {
  it('renders logo text', () => {
    render(<Navbar />)
    expect(screen.getByText(/nómada/i)).toBeInTheDocument()
  })

  it('renders reservar link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /reservar/i })).toBeInTheDocument()
  })

  it('reservar link points to /reservar', () => {
    render(<Navbar />)
    const link = screen.getByRole('link', { name: /reservar/i })
    expect(link).toHaveAttribute('href', '/reservar')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/components/layout/Navbar.test.tsx --no-coverage
```

Expected: FAIL — "Cannot find module"

- [ ] **Step 3: Create Navbar**

Create `components/layout/Navbar.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/habitaciones', label: 'Habitaciones' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-nomada-sage-light">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-nomada-green tracking-wide uppercase">
            Hostal <span className="text-nomada-green">Nómada</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-nomada-green font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button asChild size="md">
          <Link href="/reservar">Reservar</Link>
        </Button>
      </nav>
    </header>
  )
}
```

- [ ] **Step 4: Fix Button to support `asChild` with Link**

Update `components/ui/Button.tsx` — replace the return:

```typescript
import Link from 'next/link'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  asChild,
  href,
  ...props
}: ButtonProps & { href?: string }) {
  const classes = twMerge(
    clsx(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nomada-green disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      className
    )
  )

  if (asChild && href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
```

- [ ] **Step 5: Create Footer**

Create `components/layout/Footer.tsx`:

```typescript
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-nomada-green text-nomada-sage-light">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-widest">
            Hostal Nómada
          </h3>
          <p className="text-nomada-sage text-sm leading-relaxed">
            Edificio colonial de más de 75 años en el corazón histórico de Santiago, RD.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>#43 C. Máximo Gómez, Santiago de los Caballeros, RD</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a
                href="https://wa.me/18091234567"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm">
            {[
              ['/', 'Inicio'],
              ['/habitaciones', 'Habitaciones'],
              ['/reservar', 'Reservar'],
              ['/nosotros', 'Nosotros'],
              ['/contacto', 'Contacto'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-nomada-green-dark text-center py-4 text-xs text-nomada-sage">
        © {new Date().getFullYear()} Hostal Nómada. Santiago de los Caballeros, RD.
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Update root layout**

Replace `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hostalnomadard.com'),
  title: {
    default: 'Hostal Nómada — Santiago de los Caballeros, RD',
    template: '%s | Hostal Nómada',
  },
  description:
    'Hostal boutique en edificio colonial de más de 75 años en el centro histórico de Santiago de los Caballeros, República Dominicana. Habitaciones privadas y compartidas.',
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'Hostal Nómada',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Run tests**

```bash
npx jest __tests__/components/layout/Navbar.test.tsx --no-coverage
```

Expected: PASS (3 tests)

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add root layout with Navbar and Footer"
```

---

## Task 4: Homepage

**Files:**
- Create: `app/page.tsx`
- Create: `components/home/Hero.tsx`
- Create: `components/home/RoomsPreview.tsx`
- Create: `components/home/Amenities.tsx`
- Create: `components/home/Reviews.tsx`
- Create: `components/home/LocationSection.tsx`
- Create: `__tests__/components/home/Reviews.test.tsx`

- [ ] **Step 1: Write failing test for Reviews**

Create `__tests__/components/home/Reviews.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { Reviews } from '@/components/home/Reviews'

describe('Reviews', () => {
  it('renders all 4 reviews', () => {
    render(<Reviews />)
    expect(screen.getByText(/Landon/i)).toBeInTheDocument()
    expect(screen.getByText(/Ólfir/i)).toBeInTheDocument()
    expect(screen.getByText(/Harold/i)).toBeInTheDocument()
    expect(screen.getByText(/Leny/i)).toBeInTheDocument()
  })

  it('renders star ratings', () => {
    render(<Reviews />)
    const stars = screen.getAllByLabelText('estrella')
    expect(stars.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/components/home/Reviews.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Create Hero component**

Create `components/home/Hero.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-nomada-green overflow-hidden">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,_#C8D4BF_1px,_transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-nomada-sage text-sm font-medium tracking-widest uppercase mb-4">
            Santiago de los Caballeros, RD
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Tu hogar en el corazón histórico
          </h1>
          <p className="text-nomada-sage text-lg md:text-xl mb-10 leading-relaxed">
            Edificio colonial de más de 75 años restaurado para el viajero moderno. 
            Habitaciones privadas y compartidas a pasos del Monumento y la vida nocturna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild href="/reservar">
              Reservar ahora
            </Button>
            <Button size="lg" variant="outline" asChild href="/habitaciones">
              <span className="text-white border-white hover:bg-white/10">
                Ver habitaciones
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create RoomsPreview component**

Create `components/home/RoomsPreview.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Users, Bath, Wind } from 'lucide-react'

const rooms = [
  {
    id: 'valle',
    name: 'Cuarto Valle',
    type: 'Privado',
    description: 'Cama matrimonial, decoración colonial minimalista en tonos cálidos con detalles azules. Baño privado con ducha caliente.',
    capacity: 2,
    beds: 1,
    bath: 'Privado',
    amenities: ['AC', 'WiFi', 'Smart lock', 'Mascotas bienvenidas'],
    priceFrom: 'Desde DOP 2,400',
  },
  {
    id: 'compartida',
    name: 'Habitación Compartida',
    type: 'Compartido',
    description: 'Literas en ambiente acogedor con áreas comunes diseñadas para socializar. La experiencia hostal clásica.',
    capacity: 4,
    beds: 4,
    bath: 'Compartido',
    amenities: ['AC', 'WiFi', 'Lockers', 'Linen incluido'],
    priceFrom: 'Desde DOP 900',
  },
]

export function RoomsPreview() {
  return (
    <section className="py-20 bg-nomada-cream">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Habitaciones"
          subtitle="Elige tu espacio — privacidad o comunidad, tú decides."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-nomada-sage-light">
              {/* Photo placeholder — replace with real image */}
              <div className="h-56 bg-nomada-green/20 flex items-center justify-center">
                <span className="text-nomada-green font-medium">{room.name}</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-medium text-nomada-green bg-nomada-sage-light px-2 py-1 rounded-full uppercase tracking-wide">
                      {room.type}
                    </span>
                    <h3 className="text-xl font-bold mt-2">{room.name}</h3>
                  </div>
                  <p className="text-nomada-green font-semibold text-sm">{room.priceFrom}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                <div className="flex gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Users size={14} />{room.capacity} huéspedes</span>
                  <span className="flex items-center gap-1"><Bath size={14} />Baño {room.bath}</span>
                  <span className="flex items-center gap-1"><Wind size={14} />AC</span>
                </div>
                <Button variant="outline" size="sm" asChild href="/reservar">
                  Reservar
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/habitaciones" className="text-nomada-green font-medium hover:underline">
            Ver todas las habitaciones →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create Amenities component**

Create `components/home/Amenities.tsx`:

```typescript
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Wifi, Wind, Lock, PawPrint, Car, Shirt, Droplets, Users } from 'lucide-react'

const amenities = [
  { icon: Wifi, label: 'WiFi Gratis' },
  { icon: Wind, label: 'Aire Acondicionado' },
  { icon: Lock, label: 'Cerradura Inteligente' },
  { icon: PawPrint, label: 'Mascotas OK' },
  { icon: Car, label: 'Estacionamiento' },
  { icon: Shirt, label: 'Toallas y Sábanas' },
  { icon: Droplets, label: 'Ducha Caliente' },
  { icon: Users, label: 'Sala Común' },
]

export function Amenities() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Todo lo que necesitas"
          subtitle="Sin sorpresas. Sin extras ocultos."
          centered
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {amenities.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center p-6 rounded-xl bg-nomada-cream hover:bg-nomada-sage-light transition-colors">
              <Icon size={28} className="text-nomada-green mb-3" />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create Reviews component**

Create `components/home/Reviews.tsx`:

```typescript
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Star } from 'lucide-react'

const reviews = [
  {
    author: 'Landon',
    location: 'Arlington, Virginia',
    rating: 5,
    text: '¡Este lugar fue realmente excepcional! Excelente ubicación en el corazón de la ciudad, y una sensación histórica del lugar que hizo que uno se sintiera bastante privilegiado de quedarse allí. Excelente comunicación y flexibilidad de los anfitriones.',
    date: 'Dic 2025',
  },
  {
    author: 'Ólfir',
    location: 'San Francisco de Macorís, RD',
    rating: 5,
    text: 'El hostal Nómada no solo me regaló una estadía bonita, sino que me permitió realizar un viaje hacia mi interior y vivir la experiencia de estar en una zona histórica. Los anfitriones son muy amables y asertivos.',
    date: 'Abr 2026',
  },
  {
    author: 'Harold',
    location: 'Santo Domingo, RD',
    rating: 5,
    text: 'Mi estancia fue corta pero confortable. Lugar cómodo, seguro y limpio. Tiene bares, tiendas y restaurantes cerca. Muy conforme con las atenciones.',
    date: 'Nov 2025',
  },
  {
    author: 'Leny',
    location: 'Santo Domingo, RD',
    rating: 5,
    text: 'Muy agradable y confortable, buen trato por parte de la anfitrión, siempre atenta y a la orden.',
    date: 'Dic 2025',
  },
]

export function Reviews() {
  return (
    <section className="py-20 bg-nomada-green">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Lo que dicen nuestros huéspedes"
          subtitle="4.64 ⭐ en Airbnb · 4.69 ⭐ en Hostelworld"
          centered
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {reviews.map((review) => (
            <div key={review.author + review.date} className="bg-nomada-green-dark rounded-2xl p-6">
              <div className="flex mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                    aria-label="estrella"
                  />
                ))}
              </div>
              <p className="text-nomada-sage leading-relaxed mb-4 text-sm">"{review.text}"</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold text-sm">{review.author}</p>
                  <p className="text-nomada-sage text-xs">{review.location}</p>
                </div>
                <span className="text-nomada-sage text-xs">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create LocationSection component**

Create `components/home/LocationSection.tsx`:

```typescript
import { SectionTitle } from '@/components/ui/SectionTitle'
import { MapPin, Train, Utensils, Music } from 'lucide-react'

const highlights = [
  { icon: MapPin, text: 'A pasos del Monumento a los Héroes' },
  { icon: Train, text: 'Cerca del Monorriel de Santiago' },
  { icon: Utensils, text: 'Rodeado de restaurantes y cafés' },
  { icon: Music, text: 'Zona de vida nocturna activa' },
]

export function LocationSection() {
  return (
    <section className="py-20 bg-nomada-cream">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="En el corazón de Santiago"
          subtitle="#43 C. Máximo Gómez, Centro Histórico"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-start">
          <div className="rounded-2xl overflow-hidden h-80 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8!2d-70.7066258!3d19.4521542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1cf61a5f6a4ed%3A0xc4a749097ca77d4a!2sHostal%20N%C3%B3mada%20-%20Santiago%20de%20los%20Caballeros!5e0!3m2!1ses!2sdo!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-nomada-sage-light flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-nomada-green" />
                </div>
                <p className="text-gray-700 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Assemble Homepage**

Replace `app/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { RoomsPreview } from '@/components/home/RoomsPreview'
import { Amenities } from '@/components/home/Amenities'
import { Reviews } from '@/components/home/Reviews'
import { LocationSection } from '@/components/home/LocationSection'

export const metadata: Metadata = {
  title: 'Hostal Nómada — Santiago de los Caballeros, RD',
  description:
    'Hostal boutique en edificio colonial de 75+ años. Habitaciones privadas y compartidas en el centro histórico de Santiago de los Caballeros, República Dominicana.',
  openGraph: {
    title: 'Hostal Nómada — Santiago de los Caballeros, RD',
    description: 'Edificio colonial restaurado en el corazón histórico de Santiago, RD.',
    url: 'https://hostalnomadard.com',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <RoomsPreview />
      <Amenities />
      <Reviews />
      <LocationSection />
    </>
  )
}
```

- [ ] **Step 9: Run Reviews tests**

```bash
npx jest __tests__/components/home/Reviews.test.tsx --no-coverage
```

Expected: PASS (2 tests)

- [ ] **Step 10: Verify visually**

```bash
npm run dev
```

Open http://localhost:3000 — verify homepage renders with all sections.

- [ ] **Step 11: Commit**

```bash
git add .
git commit -m "feat: add homepage with Hero, Rooms, Amenities, Reviews, Location"
```

---

## Task 5: Rooms Page

**Files:**
- Create: `app/habitaciones/page.tsx`
- Create: `components/rooms/RoomCard.tsx`
- Create: `__tests__/components/rooms/RoomCard.test.tsx`

- [ ] **Step 1: Write failing test for RoomCard**

Create `__tests__/components/rooms/RoomCard.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { RoomCard } from '@/components/rooms/RoomCard'

const mockRoom = {
  id: 'valle',
  name: 'Cuarto Valle',
  type: 'Privado' as const,
  description: 'Cuarto colonial con cama matrimonial.',
  capacity: 2,
  beds: 1,
  bath: 'Privado',
  amenities: ['AC', 'WiFi'],
  priceFrom: 'Desde DOP 2,400',
}

describe('RoomCard', () => {
  it('renders room name', () => {
    render(<RoomCard room={mockRoom} />)
    expect(screen.getByText('Cuarto Valle')).toBeInTheDocument()
  })

  it('renders price', () => {
    render(<RoomCard room={mockRoom} />)
    expect(screen.getByText('Desde DOP 2,400')).toBeInTheDocument()
  })

  it('renders reservar button linking to /reservar', () => {
    render(<RoomCard room={mockRoom} />)
    const link = screen.getByRole('link', { name: /reservar/i })
    expect(link).toHaveAttribute('href', '/reservar')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/components/rooms/RoomCard.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Create RoomCard component**

Create `components/rooms/RoomCard.tsx`:

```typescript
import Link from 'next/link'
import { Users, Bath, Wind, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface Room {
  id: string
  name: string
  type: 'Privado' | 'Compartido'
  description: string
  capacity: number
  beds: number
  bath: string
  amenities: string[]
  priceFrom: string
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-nomada-sage-light flex flex-col">
      <div className="h-64 bg-nomada-green/20 flex items-center justify-center">
        <span className="text-nomada-green font-medium">{room.name}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-xs font-medium text-nomada-green bg-nomada-sage-light px-2 py-1 rounded-full uppercase tracking-wide">
              {room.type}
            </span>
            <h2 className="text-2xl font-bold mt-2">{room.name}</h2>
          </div>
          <p className="text-nomada-green font-semibold">{room.priceFrom}</p>
        </div>

        <p className="text-gray-600 mb-4 flex-1">{room.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-5">
          <span className="flex items-center gap-1"><Users size={14} />{room.capacity} huéspedes</span>
          <span className="flex items-center gap-1"><Bath size={14} />Baño {room.bath}</span>
          <span className="flex items-center gap-1"><Wind size={14} />AC</span>
        </div>

        <ul className="space-y-1 mb-6">
          {room.amenities.map((a) => (
            <li key={a} className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={14} className="text-nomada-green" />
              {a}
            </li>
          ))}
        </ul>

        <Button asChild href="/reservar" size="md">
          Reservar esta habitación
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create Rooms page**

Create `app/habitaciones/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { RoomCard, type Room } from '@/components/rooms/RoomCard'

export const metadata: Metadata = {
  title: 'Habitaciones',
  description:
    'Habitaciones privadas y compartidas en Hostal Nómada. Cuarto Valle con baño privado y opciones compartidas en el centro histórico de Santiago, RD.',
}

const rooms: Room[] = [
  {
    id: 'valle',
    name: 'Cuarto Valle',
    type: 'Privado',
    description:
      'Cama matrimonial cómoda con decoración minimalista en tonos cálidos y detalles en azul. Baño privado compacto con agua caliente, espejo redondo y ducha práctica. Ideal para quienes buscan comodidad y privacidad mientras exploran la ciudad.',
    capacity: 2,
    beds: 1,
    bath: 'Privado',
    amenities: [
      'WiFi gratis',
      'Aire acondicionado',
      'Cerradura inteligente',
      'Mascotas bienvenidas',
      'Toallas y sábanas incluidas',
      'Estacionamiento gratuito',
      'Secadora de pelo',
    ],
    priceFrom: 'Desde DOP 2,400',
  },
  {
    id: 'compartida',
    name: 'Habitación Compartida',
    type: 'Compartido',
    description:
      'Espacios comunes diseñados para socializar con viajeros de todo el mundo. Literas cómodas en ambiente colonial. La experiencia hostal auténtica en el corazón de Santiago.',
    capacity: 4,
    beds: 4,
    bath: 'Compartido',
    amenities: [
      'WiFi gratis',
      'Aire acondicionado',
      'Lockers personales',
      'Linen incluido',
      'Sala común',
      'Almacenaje de equipaje',
    ],
    priceFrom: 'Desde DOP 900',
  },
]

export default function HabitacionesPage() {
  return (
    <div className="py-16 bg-nomada-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Habitaciones
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todas nuestras habitaciones incluyen WiFi, AC y acceso a las áreas comunes.
            Precios por persona/noche. Impuestos incluidos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run tests**

```bash
npx jest __tests__/components/rooms/RoomCard.test.tsx --no-coverage
```

Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add habitaciones page with RoomCard component"
```

---

## Task 6: Reservar Page (Sirvoy Widget)

**Files:**
- Create: `app/reservar/page.tsx`
- Create: `components/SirvoyWidget.tsx`
- Create: `__tests__/components/SirvoyWidget.test.tsx`

- [ ] **Step 1: Write failing test**

Create `__tests__/components/SirvoyWidget.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { SirvoyWidget } from '@/components/SirvoyWidget'

describe('SirvoyWidget', () => {
  it('renders the widget container', () => {
    render(<SirvoyWidget engineId="test-id" />)
    expect(screen.getByTestId('sirvoy-widget-container')).toBeInTheDocument()
  })

  it('renders fallback link when no engineId', () => {
    render(<SirvoyWidget engineId="" />)
    expect(screen.getByText(/sirvoy/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/components/SirvoyWidget.test.tsx --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Create SirvoyWidget (client component)**

Create `components/SirvoyWidget.tsx`:

```typescript
'use client'

import { useEffect } from 'react'

interface SirvoyWidgetProps {
  engineId: string
}

export function SirvoyWidget({ engineId }: SirvoyWidgetProps) {
  useEffect(() => {
    if (!engineId) return

    const existing = document.querySelector('script[data-form-id]')
    if (existing) return

    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-form-id', engineId)
    script.src = 'https://secured.sirvoy.com/widget/sirvoy.js'
    document.body.appendChild(script)

    return () => {
      const el = document.querySelector('script[data-form-id]')
      if (el) el.remove()
    }
  }, [engineId])

  if (!engineId) {
    return (
      <div className="text-center py-12 text-gray-500">
        Widget de reservas no configurado.{' '}
        <a
          href="https://secured.sirvoy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-nomada-green underline"
        >
          Ir a Sirvoy
        </a>
      </div>
    )
  }

  return (
    <div
      data-testid="sirvoy-widget-container"
      className="w-full min-h-[500px]"
      id="sirvoy-booking-widget"
    />
  )
}
```

- [ ] **Step 4: Create Reservar page**

Create `app/reservar/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { SirvoyWidget } from '@/components/SirvoyWidget'

export const metadata: Metadata = {
  title: 'Reservar',
  description:
    'Reserva tu habitación en Hostal Nómada. Disponibilidad en tiempo real. Confirmación inmediata.',
}

export default function ReservarPage() {
  const engineId = process.env.NEXT_PUBLIC_SIRVOY_ENGINE_ID ?? ''

  return (
    <div className="py-16 bg-nomada-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Reservar</h1>
          <p className="text-gray-600">
            Check-in: 3:00pm – 11:00pm &nbsp;·&nbsp; Check-out: hasta las 11:00am
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <SirvoyWidget engineId={engineId} />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run tests**

```bash
npx jest __tests__/components/SirvoyWidget.test.tsx --no-coverage
```

Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add reservar page with Sirvoy booking widget"
```

---

## Task 7: Nosotros + Contacto Pages

**Files:**
- Create: `app/nosotros/page.tsx`
- Create: `app/contacto/page.tsx`

- [ ] **Step 1: Create Nosotros page**

Create `app/nosotros/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { Heart, Home, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce a los anfitriones de Hostal Nómada — una pareja joven apasionada por el turismo local en Santiago de los Caballeros, RD.',
}

const values = [
  {
    icon: Home,
    title: 'Historia viva',
    text: 'Nuestro edificio tiene más de 75 años. Nació como hospital, fue abandonado por más de 20 años, y lo restauramos conservando su alma colonial.',
  },
  {
    icon: Heart,
    title: 'Gestión personal',
    text: 'Somos una pareja joven que vive en el hostal con nuestros 2 perros. Respondemos en menos de una hora y estamos aquí para lo que necesites.',
  },
  {
    icon: Globe,
    title: 'Viajeros para viajeros',
    text: 'Diseñado para el viajero moderno que quiere explorar Santiago auténticamente — no desde un resort, sino desde el corazón de la ciudad.',
  },
]

export default function NosotrosPage() {
  return (
    <div className="py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestra historia
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Nómada es un hostal acogedor en el centro histórico de Santiago, RD,
            gestionado por una pareja joven que vive aquí con sus 2 perros.
          </p>
        </div>

        <div className="bg-nomada-green rounded-2xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">El edificio</h2>
          <p className="text-nomada-sage leading-relaxed text-lg">
            Con más de 75 años de historia, este emblemático edificio comenzó como un
            hospital y ha sido restaurado tras permanecer abandonado por más de 20 años.
            Su arquitectura conserva el encanto colonial con toques modernos. La fachada
            en tonos verdes y detalles azules destaca en un entorno urbano rodeado de
            calles peatonales y luces colgantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-nomada-cream rounded-xl p-6">
              <Icon size={28} className="text-nomada-green mb-4" />
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-gray-500">
          <p>14 años como anfitriones · Hablamos español e inglés · Respuesta en &lt;1 hora</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create Contacto page**

Create `app/contacto/page.tsx`:

```typescript
import type { Metadata } from 'next'
import { MapPin, Clock, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contáctanos en Hostal Nómada. #43 C. Máximo Gómez, Santiago de los Caballeros, RD. WhatsApp disponible.',
}

export default function ContactoPage() {
  return (
    <div className="py-16 bg-nomada-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-gray-600">Estamos aquí para ayudarte.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl overflow-hidden h-96 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8!2d-70.7066258!3d19.4521542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1cf61a5f6a4ed%3A0xc4a749097ca77d4a!2sHostal%20N%C3%B3mada%20-%20Santiago%20de%20los%20Caballeros!5e0!3m2!1ses!2sdo!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-nomada-green mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p className="text-gray-600 text-sm">#43 C. Máximo Gómez</p>
                    <p className="text-gray-600 text-sm">Santiago de los Caballeros, RD</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-nomada-green mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Horarios</p>
                    <p className="text-gray-600 text-sm">Check-in: 3:00pm – 11:00pm</p>
                    <p className="text-gray-600 text-sm">Check-out: hasta las 11:00am</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-nomada-green mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-gray-600 text-sm">Respondemos en menos de 1 hora</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/18091234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full rounded-md font-medium transition-colors bg-nomada-green text-white hover:bg-nomada-green-dark px-7 py-3.5 text-lg"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify pages render**

```bash
npm run dev
```

Visit http://localhost:3000/nosotros and http://localhost:3000/contacto — verify both render correctly.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add nosotros and contacto pages"
```

---

## Task 8: SEO — Schema.org + Sitemap + Robots

**Files:**
- Modify: `app/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `__tests__/seo/schema.test.ts`

- [ ] **Step 1: Write failing test for schema**

Create `__tests__/seo/schema.test.ts`:

```typescript
import { lodgingSchema } from '@/lib/seo'

describe('LodgingBusiness schema', () => {
  it('has correct @type', () => {
    expect(lodgingSchema['@type']).toBe('LodgingBusiness')
  })

  it('has correct name', () => {
    expect(lodgingSchema.name).toBe('Hostal Nómada')
  })

  it('has address with correct city', () => {
    expect(lodgingSchema.address.addressLocality).toBe('Santiago de los Caballeros')
  })

  it('has geo coordinates', () => {
    expect(lodgingSchema.geo.latitude).toBe('19.4521542')
    expect(lodgingSchema.geo.longitude).toBe('-70.7066258')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/seo/schema.test.ts --no-coverage
```

Expected: FAIL

- [ ] **Step 3: Create SEO lib**

Create `lib/seo.ts`:

```typescript
export const lodgingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Hostal Nómada',
  description:
    'Hostal boutique en edificio colonial de más de 75 años en el centro histórico de Santiago de los Caballeros, República Dominicana.',
  url: 'https://hostalnomadard.com',
  telephone: '+18091234567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '#43 C. Máximo Gómez',
    addressLocality: 'Santiago de los Caballeros',
    addressRegion: 'Santiago',
    addressCountry: 'DO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '19.4521542',
    longitude: '-70.7066258',
  },
  checkinTime: '15:00',
  checkoutTime: '11:00',
  petsAllowed: true,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.64',
    reviewCount: '11',
    bestRating: '5',
  },
}
```

- [ ] **Step 4: Add Schema to Homepage**

In `app/page.tsx`, add before the JSX return:

```typescript
import { lodgingSchema } from '@/lib/seo'

// Inside HomePage(), add this before the fragments:
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
      />
      <Hero />
      <RoomsPreview />
      <Amenities />
      <Reviews />
      <LocationSection />
    </>
  )
}
```

- [ ] **Step 5: Create sitemap**

Create `app/sitemap.ts`:

```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hostalnomadard.com'
  const pages = ['', '/habitaciones', '/reservar', '/nosotros', '/contacto']

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}
```

- [ ] **Step 6: Create robots.txt**

Create `app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: 'https://hostalnomadard.com/sitemap.xml',
  }
}
```

- [ ] **Step 7: Run tests**

```bash
npx jest __tests__/seo/schema.test.ts --no-coverage
```

Expected: PASS (4 tests)

- [ ] **Step 8: Verify sitemap**

```bash
npm run dev
```

Visit http://localhost:3000/sitemap.xml — verify 5 URLs. Visit http://localhost:3000/robots.txt — verify content.

- [ ] **Step 9: Run all tests**

```bash
npx jest --no-coverage
```

Expected: all tests PASS.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: add SEO schema, sitemap, robots.txt"
```

---

## Task 9: Vercel Deploy Config

**Files:**
- Create: `vercel.json`
- Modify: `next.config.ts`

- [ ] **Step 1: Update next.config.ts**

Replace `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'secured.sirvoy.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/webhooks/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ]
  },
}

export default nextConfig
```

- [ ] **Step 2: Build and verify no errors**

```bash
npm run build
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 3: Commit and push**

```bash
git add .
git commit -m "feat: configure Next.js for Vercel production deploy"
git push origin main
```

Expected: Vercel picks up the push and deploys automatically.

---

## Completion Checklist

- [ ] All tests passing: `npx jest --no-coverage`
- [ ] Build succeeds: `npm run build`
- [ ] Homepage renders with all sections
- [ ] `/habitaciones` shows room cards
- [ ] `/reservar` shows Sirvoy widget container (or fallback)
- [ ] `/nosotros` and `/contacto` render
- [ ] `/sitemap.xml` returns 5 URLs
- [ ] `/robots.txt` disallows `/admin/`
- [ ] Schema.org JSON-LD present in homepage HTML
- [ ] Deployed on Vercel at `hostalnomadard.com`
