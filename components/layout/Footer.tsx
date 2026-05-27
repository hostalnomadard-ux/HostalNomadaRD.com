import Link from 'next/link'
import { MapPin, MessageCircle } from 'lucide-react'

const navLinks: [string, string][] = [
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
            <span className="w-2 h-2 rounded-full bg-verde-fresco" aria-hidden="true" />
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
              <span>
                C/ Benito Monción 29, esq. Máximo Gómez 34<br />
                Centro Histórico, Santiago, RD
              </span>
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
