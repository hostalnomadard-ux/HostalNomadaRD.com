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
            <div
              key={review.author + review.date}
              className="bg-nomada-green-dark rounded-2xl p-6"
            >
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
