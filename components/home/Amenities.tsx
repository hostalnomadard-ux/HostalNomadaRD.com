import { SectionTitle } from '@/components/ui/SectionTitle'
import { Wifi, Wind, Lock, PawPrint, Car, Shirt, Droplets, Users } from 'lucide-react'

const amenities = [
  { icon: Wifi, label: 'WiFi Gratis' },
  { icon: Wind, label: 'Aire Acondicionado' },
  { icon: Lock, label: 'Cerradura Inteligente' },
  { icon: PawPrint, label: 'Mascotas OK' },
  { icon: Car, label: 'Estacionamiento' },
  { icon: Shirt, label: 'Toallas y Sábanas' },
  { icon: Droplets, label: 'Ducha Caliente' },
  { icon: Users, label: 'Sala Común' },
]

export function Amenities() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Todo lo que necesitas"
          subtitle="Sin sorpresas. Sin extras ocultos."
          centered
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {amenities.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-nomada-cream hover:bg-nomada-sage-light transition-colors"
            >
              <Icon size={28} className="text-nomada-green mb-3" />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
