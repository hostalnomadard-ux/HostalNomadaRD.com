import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'

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
