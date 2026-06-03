import { Wifi, Wind, Lock, PawPrint, Car, Shirt, Droplets, Users, Beer } from 'lucide-react'

const amenities = [
  { icon: Wifi,     label: 'WiFi Gratis',        highlight: false },
  { icon: Wind,     label: 'Aire Acondicionado',  highlight: false },
  { icon: Lock,     label: 'Smart Lock 24h',      highlight: false },
  { icon: PawPrint, label: 'Mascotas OK',         highlight: false },
  { icon: Car,      label: 'Parking gratuito',              highlight: false },
  { icon: Shirt,    label: 'Toallas y Sábanas',   highlight: false },
  { icon: Droplets, label: 'Ducha Caliente',      highlight: false },
  { icon: Users,    label: 'Sala Común',          highlight: false },
  { icon: Beer,     label: 'Cervecería Búcaro',   highlight: true  },
]

export function Amenities() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Incluido
          </p>
          <h2 className="text-4xl font-bold text-carbon">Todo lo que necesitas.</h2>
          <p className="text-gray-500 mt-3 text-lg">Sin sorpresas. Sin extras ocultos.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map(({ icon: Icon, label, highlight }) => (
            <div
              key={label}
              className={`flex flex-col items-center text-center p-5 rounded-xl transition-all duration-200 ${
                highlight
                  ? 'bg-royal-blue shadow-md animate-[glow-pulse_3s_ease-in-out_infinite]'
                  : 'bg-white hover:bg-verde-fresco-light hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              <Icon
                size={26}
                className={`mb-3 ${highlight ? 'text-white' : 'text-royal-blue'}`}
              />
              <span className={`text-sm font-medium ${highlight ? 'text-white' : 'text-gray-700'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
