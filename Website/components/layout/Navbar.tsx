'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/habitaciones', label: 'Habitaciones' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/cerveceria', label: 'Cervecería' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-navbar.png"
            alt="Hostal Nómada"
            width={88}
            height={43}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-gray-600 hover:text-carbon font-medium text-sm transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-verde-fresco after:transition-all after:duration-200 hover:after:w-full"
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
          className="md:hidden p-2 text-carbon relative w-8 h-8 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <Menu
            size={22}
            className={`absolute transition-all duration-200 ${open ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
          />
          <X
            size={22}
            className={`absolute transition-all duration-200 ${open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 flex flex-col gap-3 ${open ? 'max-h-96 opacity-100 px-4 pb-4' : 'max-h-0 opacity-0'}`}>
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
    </header>
  )
}
