import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Users, Bath, Wind, Lock } from 'lucide-react'

const rooms = [
  {
    id: 'valle',
    name: 'Cuarto Valle',
    type: 'Privado',
    description:
      'Cama matrimonial, decoración colonial minimalista con detalles azules. Baño privado con ducha caliente.',
    capacity: 2,
    bath: 'Privado',
    priceFrom: 'Desde DOP 2,400',
    priceSub: '≈ $40 USD / noche',
    accentClass: 'bg-verde-fresco',
  },
  {
    id: 'compartida',
    name: 'Habitación Compartida',
    type: 'Compartido',
    description:
      'Literas en ambiente social. Áreas comunes diseñadas para conocer gente y vivir la experiencia hostal.',
    capacity: 4,
    bath: 'Compartido',
    priceFrom: 'Desde DOP 900',
    priceSub: '≈ $15 USD / noche',
    accentClass: 'bg-royal-blue',
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Foto placeholder — reemplazar con next/image en producción */}
              <div className={`h-60 ${room.accentClass} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,_white_1px,_transparent_1px)] bg-[size:30px_30px]" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {room.type}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-carbon">{room.name}</h3>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-carbon font-bold text-sm">{room.priceFrom}</p>
                    <p className="text-gray-400 text-xs">{room.priceSub}</p>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{room.description}</p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1">
                    <Users size={13} /> {room.capacity} huéspedes
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={13} /> Baño {room.bath}
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
