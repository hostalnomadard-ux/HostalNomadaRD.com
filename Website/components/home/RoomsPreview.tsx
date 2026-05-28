import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Users, Bath, Wind, Lock } from 'lucide-react'

const rooms = [
  {
    id: 'valle',
    name: 'Valle',
    type: 'Privado',
    description: 'Cama full size, baño privado, detalles en azul royal. El cuarto clásico del hostal en pleno centro histórico.',
    rating: '⭐ 4.64 · 11 reseñas',
    image: '/images/cuarto-valle.jpg',
  },
  {
    id: 'jungle',
    name: 'Jungle',
    type: 'Privado',
    description: 'Cama full size, baño privado, ambiente tropical con luz natural. Tranquilidad urbana en el corazón de Santiago.',
    rating: '⭐ 4.5 · 6 reseñas',
    image: '/images/cuarto-jungle.jpg',
  },
  {
    id: 'mountain',
    name: 'Mountain',
    type: 'Privado',
    description: 'Cama full size, baño privado y balcón con vista a la ciudad. Guest Favorite en Airbnb — ⭐ 5.0 perfecto.',
    rating: '⭐ 5.0 · 8 reseñas · Guest Favorite',
    image: '/images/cuarto-mountain.jpg',
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
            <h2 className="text-4xl font-bold text-carbon">Elige tu espacio.</h2>
          </div>
          <Link
            href="/habitaciones"
            className="text-royal-blue font-semibold text-sm hover:underline shrink-0"
          >
            Ver todas las habitaciones →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-52 relative overflow-hidden">
                <Image
                  src={room.image}
                  alt={`Cuarto ${room.name} — Hostal Nómada`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {room.type}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white">
                <h3 className="text-xl font-bold text-carbon mb-1">{room.name}</h3>
                <p className="text-xs text-verde-fresco font-medium mb-3">{room.rating}</p>

                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{room.description}</p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1">
                    <Users size={13} /> 2 huéspedes
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={13} /> Baño privado
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind size={13} /> AC
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock size={13} /> Smart Lock
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
