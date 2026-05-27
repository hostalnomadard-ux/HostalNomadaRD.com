import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Users, Bath, Wind } from 'lucide-react'

const rooms = [
  {
    id: 'valle',
    name: 'Cuarto Valle',
    type: 'Privado',
    description:
      'Cama matrimonial, decoración colonial minimalista en tonos cálidos con detalles azules. Baño privado con ducha caliente.',
    capacity: 2,
    bath: 'Privado',
    priceFrom: 'Desde DOP 2,400',
  },
  {
    id: 'compartida',
    name: 'Habitación Compartida',
    type: 'Compartido',
    description:
      'Literas en ambiente acogedor con áreas comunes diseñadas para socializar. La experiencia hostal clásica.',
    capacity: 4,
    bath: 'Compartido',
    priceFrom: 'Desde DOP 900',
  },
]

export function RoomsPreview() {
  return (
    <section className="py-20 bg-nomada-cream">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Habitaciones"
          subtitle="Elige tu espacio — privacidad o comunidad, tú decides."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-nomada-sage-light"
            >
              <div className="h-56 bg-nomada-green/20 flex items-center justify-center">
                <span className="text-nomada-green font-medium">{room.name}</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-medium text-nomada-green bg-nomada-sage-light px-2 py-1 rounded-full uppercase tracking-wide">
                      {room.type}
                    </span>
                    <h3 className="text-xl font-bold mt-2">{room.name}</h3>
                  </div>
                  <p className="text-nomada-green font-semibold text-sm">{room.priceFrom}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                <div className="flex gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {room.capacity} huéspedes
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={14} />
                    Baño {room.bath}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind size={14} />
                    AC
                  </span>
                </div>
                <Button variant="outline" size="sm" href="/reservar">
                  Reservar
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/habitaciones" className="text-nomada-green font-medium hover:underline">
            Ver todas las habitaciones →
          </Link>
        </div>
      </div>
    </section>
  )
}
