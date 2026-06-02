import Image from 'next/image'
import { Users, Bath, Wind, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface Room {
  id: string
  name: string
  type: 'Privado' | 'Compartido'
  description: string
  capacity: number
  beds: number
  bath: string
  amenities: string[]
  priceFrom: string
  image?: string
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <div className="h-64 relative bg-verde-fresco-light">
        {room.image ? (
          <Image
            src={room.image}
            alt={`${room.name} — Hostal Nómada`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-verde-fresco/30 text-4xl">🏨</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-xs font-medium text-verde-fresco bg-verde-fresco-light px-2 py-1 rounded-full uppercase tracking-wide">
              {room.type}
            </span>
            <h2 className="text-2xl font-bold mt-2">{room.name}</h2>
          </div>
          <p className="text-verde-fresco font-semibold">{room.priceFrom}</p>
        </div>

        <p className="text-gray-600 mb-4 flex-1">{room.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-5">
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

        <ul className="space-y-1 mb-6">
          {room.amenities.map((a) => (
            <li key={a} className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={14} className="text-verde-fresco" />
              {a}
            </li>
          ))}
        </ul>

        <Button href="/reservar" size="md">
          Reservar esta habitación
        </Button>
      </div>
    </div>
  )
}
