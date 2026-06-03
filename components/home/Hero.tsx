import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      {/* Fachada real del edificio Art Déco */}
      <div className="absolute inset-0 bg-carbon overflow-hidden hero-bg">
        <Image
          src="/images/fachada-esquina.png"
          alt="Fachada Art Déco Hostal Nómada — esquina Benito Monción y Máximo Gómez, Centro Histórico Santiago RD"
          fill
          className="object-cover object-[center_40%] animate-[ken-burns_12s_ease-out_forwards]"
          priority
        />
      </div>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-transparent hero-overlay" />

      {/* Contenido — alineado a la derecha para dejar visible el edificio */}
      <div className="relative max-w-6xl mx-auto px-4 pb-16 pt-32 w-full flex justify-start">
        <div className="max-w-xl w-full">
          <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4 opacity-0 animate-[fade-up_0.6s_ease-out_0.15s_forwards]">
            Benito Monción esq. Máximo Gómez · Santiago, RD
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 opacity-0 animate-[fade-up_0.6s_ease-out_0.3s_forwards]">
            Hostal boutique en el centro histórico de Santiago, RD.
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed opacity-0 animate-[fade-up_0.6s_ease-out_0.45s_forwards]">
            75 años en la calle más histórica de la ciudad.
            Edificio Art Déco de 1948 + Cervecería Búcaro.
            Habitaciones privadas con carácter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 opacity-0 animate-[fade-up_0.6s_ease-out_0.6s_forwards]">
            <Button size="lg" href="/reservar">
              Reservar habitación
            </Button>
            <Button size="lg" variant="outline-white" href="/cerveceria">
              Conoce la Cervecería →
            </Button>
          </div>

          {/* Rating strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 opacity-0 animate-[fade-up_0.6s_ease-out_0.75s_forwards]">
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
      </div>
    </section>
  )
}
