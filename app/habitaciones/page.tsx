import type { Metadata } from 'next'
import { RoomCard, type Room } from '@/components/rooms/RoomCard'

export const metadata: Metadata = {
  title: 'Habitaciones en Santiago RD — Hostal Nómada',
  description:
    'Habitaciones privadas y compartidas en Hostal Nómada, centro histórico de Santiago de los Caballeros, RD. Baño privado, AC, WiFi. Desde DOP 900/noche.',
}

const rooms: Room[] = [
  {
    id: 'valle',
    name: 'Cuarto Valle',
    type: 'Privado',
    description:
      'Cama matrimonial cómoda con decoración minimalista en tonos cálidos y detalles en azul. Baño privado compacto con agua caliente, espejo redondo y ducha práctica. Ideal para quienes buscan comodidad y privacidad mientras exploran la ciudad.',
    capacity: 2,
    beds: 1,
    bath: 'Privado',
    amenities: [
      'WiFi gratis',
      'Aire acondicionado',
      'Cerradura inteligente',
      'Mascotas bienvenidas',
      'Toallas y sábanas incluidas',
      'Estacionamiento gratuito',
      'Secadora de pelo',
    ],
    priceFrom: 'Desde DOP 2,400',
  },
  {
    id: 'compartida',
    name: 'Habitación Compartida',
    type: 'Compartido',
    description:
      'Espacios comunes diseñados para socializar con viajeros de todo el mundo. Literas cómodas en ambiente colonial. La experiencia hostal auténtica en el corazón de Santiago.',
    capacity: 4,
    beds: 4,
    bath: 'Compartido',
    amenities: [
      'WiFi gratis',
      'Aire acondicionado',
      'Lockers personales',
      'Linen incluido',
      'Sala común',
      'Almacenaje de equipaje',
    ],
    priceFrom: 'Desde DOP 900',
  },
]

export default function HabitacionesPage() {
  return (
    <div className="py-16 bg-nomada-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Habitaciones en Santiago de los Caballeros, RD</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todas nuestras habitaciones incluyen WiFi, AC y acceso a las áreas comunes. Precios por
            persona/noche. Impuestos incluidos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  )
}
