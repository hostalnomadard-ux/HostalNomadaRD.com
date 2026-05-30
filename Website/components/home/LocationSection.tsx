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
