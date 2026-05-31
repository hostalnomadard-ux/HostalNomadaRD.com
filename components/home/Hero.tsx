import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      {/* Fachada real del edificio Art Déco */}
      <div className="absolute inset-0 bg-carbon">
        <Image
          src="/images/fachada.jpg"
          alt="Fachada Art Déco Hostal Nómada — Benito Monción esq. Máximo Gómez, Santiago"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-transparent" />

      {/* Contenido */}
      <div className="relative max-w-6xl mx-auto px-4 pb-16 pt-32 w-full">
        <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          Benito Monción esq. Máximo Gómez · Santiago, RD
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6 max-w-3xl">
          Hostal boutique en el centro histórico de Santiago, RD.
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
          75 años en la calle más histórica de la ciudad.
          Edificio Art Déco de 1948 + Cervecería Búcaro.
          Habitaciones privadas con carácter.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Button size="lg" href="/reservar">
            Reservar habitación
          </Button>
          <Button size="lg" variant="outline-white" href="/cerveceria">
            Conoce la Cervecería →
          </Button>
        </div>

        {/* Rating strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white font-semibold">4.64</span>
            <span>Airbnb</span>
          </span>
          <span className="w-px h-4 bg-gray-600 hidden sm:block" />
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white font-semibold">4.69</span>
            <span>Hostelworld</span>
          </span>
          <span className="w-px h-4 bg-gray-600 hidden sm:block" />
          <span>457 reseñas</span>
          <span className="w-px h-4 bg-gray-600 hidden sm:block" />
          <span className="text-verde-fresco font-medium">🍺 Cervecería Búcaro</span>
        </div>
      </div>
    </section>
  )
}
