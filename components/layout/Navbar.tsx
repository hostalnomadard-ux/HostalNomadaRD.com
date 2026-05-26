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
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-nomada-green tracking-wide uppercase">
            Hostal Nómada
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

        <Button href="/reservar" size="md">
          Reservar
        </Button>
      </nav>
    </header>
  )
}
