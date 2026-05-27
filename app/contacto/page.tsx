import type { Metadata } from 'next'
import { MapPin, Clock, Phone } from 'lucide-react'

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
