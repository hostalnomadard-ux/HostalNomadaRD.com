import type { Metadata } from 'next'
import { RoomCard, type Room } from '@/components/rooms/RoomCard'

export const metadata: Metadata = {
  title: 'Habitaciones en Santiago RD',
  description:
    'Habitaciones privadas y compartidas en Hostal Nómada. Cuarto Valle, Jungle y Mountain con baño privado. Desde DOP 900/noche. Centro histórico de Santiago de los Caballeros.',
}

const rooms: Room[] = [
  {
    id: 'valle',
    name: 'Cuarto Valle',
    type: 'Privado',
    image: '/images/cuarto-valle.jpg',
    rating: '4.64',
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
    id: 'jungle',
    name: 'Cuarto Jungle',
    type: 'Privado',
    image: '/images/cuarto-jungle.jpg',
    rating: '4.5',
    description:
      'Habitación privada con atmósfera tropical y luz natural. Ideal para quienes buscan un ambiente relajado y diferente. Baño privado, WiFi de alta velocidad y cerradura inteligente incluidos.',
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
    ],
    priceFrom: 'Desde DOP 2,400',
  },
  {
    id: 'mountain',
    name: 'Cuarto Mountain',
    type: 'Privado',
    image: '/images/cuarto-mountain.jpg',
    rating: '5.0 ★ Guest Favorite',
    description:
      'La habitación más popular. Balcón privado con vistas al centro histórico de Santiago. Despierta con la ciudad frente a ti. Baño privado, WiFi y acceso independiente.',
    capacity: 2,
    beds: 1,
    bath: 'Privado',
    amenities: [
      'Balcón privado',
      'Vistas al centro histórico',
      'WiFi gratis',
      'Aire acondicionado',
      'Cerradura inteligente',
      'Mascotas bienvenidas',
      'Toallas y sábanas incluidas',
      'Estacionamiento gratuito',
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Habitaciones en el Centro Histórico de Santiago</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todas nuestras habitaciones incluyen WiFi, AC y acceso a las áreas comunes. Precios por
            persona/noche. Impuestos incluidos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  )
}
