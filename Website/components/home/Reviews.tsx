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
              <strong className="text-carbon">4.64</strong>&nbsp;Airbnb
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <strong className="text-carbon">4.69</strong>&nbsp;Hostelworld
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
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" aria-label="estrella" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed text-sm flex-1 italic mb-6">
                {review.text}
              </p>

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
