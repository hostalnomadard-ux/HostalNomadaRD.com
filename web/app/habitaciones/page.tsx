import type { Metadata } from 'next'
import { RoomCard, type Room } from '@/components/rooms/RoomCard'

export const metadata: Metadata = {
  title: 'Habitaciones en Santiago RD — Hostal Nómada',
  description:
    'Habitaciones privadas y compartidas en Hostal Nómada, centro histórico de Santiago de los Caballeros, RD. Baño privado, AC, WiFi. Desde DOP 900/noche.',
  openGraph: {
    title: 'Habitaciones en Santiago RD — Hostal Nómada',
    description: 'Habitaciones privadas y compartidas en Hostal Nómada, centro histórico de Santiago de los Caballeros, RD. Baño privado, AC, WiFi. Desde DOP 900/noche.',
    url: 'https://hostalnomadard.com/habitaciones',
    images: [{ url: '/images/cuarto-mountain.jpg', width: 1200, height: 630, alt: 'Habitaciones Hostal Nómada — Centro Histórico Santiago RD' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/cuarto-mountain.jpg'] },
  alternates: { canonical: 'https://hostalnomadard.com/habitaciones' },
}

const rooms: Room[] = [
  {
    id: 'valle',
    name: 'Cuarto Valle',
    type: 'Privado',
    image: '/images/cuarto-valle.jpg',
    description:
      'Cama full size con decoración minimalista en tonos cálidos y detalles en azul. Baño privado compacto con agua caliente, espejo redondo y ducha práctica. Ideal para quienes buscan comodidad y privacidad mientras exploran la ciudad.',
    capacity: 2,
    beds: 1,
    bath: 'Privado',
    amenities: [
      'WiFi gratis',
      'Aire acondicionado',
      'Cerradura inteligente',
      'Mascotas bienvenidas',
      'Toallas y sábanas incluidas',
      'Parking en la calle (gratis)',

    ],
    priceFrom: 'Desde DOP 2,500',
  },
  {
    id: 'jungle',
    name: 'Cuarto Jungle',
    type: 'Privado',
    image: '/images/cuarto-jungle.jpg',
    description:
      'Cama full size, baño privado, ambiente tropical con luz natural. Tranquilidad urbana en el corazón de Santiago. Perfecto para desconectarte después de explorar la ciudad.',
    capacity: 2,
    beds: 1,
    bath: 'Privado',
    amenities: [
      'WiFi gratis',
      'Aire acondicionado',
      'Cerradura inteligente',
      'Mascotas bienvenidas',
      'Toallas y sábanas incluidas',
      'Parking en la calle (gratis)',

    ],
    priceFrom: 'Desde DOP 2,500',
  },
  {
    id: 'mountain',
    name: 'Cuarto Mountain',
    type: 'Privado',
    image: '/images/cuarto-mountain.jpg',
    description:
      'Cama full size, baño privado y balcón con vista a la ciudad. Guest Favorite en Airbnb con calificación perfecta ⭐ 5.0. El cuarto con más carácter del hostal.',
    capacity: 2,
    beds: 1,
    bath: 'Privado',
    amenities: [
      'WiFi gratis',
      'Aire acondicionado',
      'Cerradura inteligente',
      'Mascotas bienvenidas',
      'Toallas y sábanas incluidas',
      'Parking en la calle (gratis)',
      'Balcón con vista a la ciudad',
    ],
    priceFrom: 'Desde DOP 2,500',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://hostalnomadard.com' },
    { '@type': 'ListItem', position: 2, name: 'Habitaciones', item: 'https://hostalnomadard.com/habitaciones' },
  ],
}

export default function HabitacionesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="py-16 bg-cream min-h-screen">
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
    </>
  )
}
