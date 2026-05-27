import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-nomada-green overflow-hidden">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,_#C8D4BF_1px,_transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-nomada-sage text-sm font-medium tracking-widest uppercase mb-4">
            Santiago de los Caballeros, RD
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Tu hogar en el corazón histórico
          </h1>
          <p className="text-nomada-sage text-lg md:text-xl mb-10 leading-relaxed">
            Edificio colonial de más de 75 años restaurado para el viajero moderno.
            Habitaciones privadas y compartidas a pasos del Monumento y la vida nocturna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" href="/reservar">
              Reservar ahora
            </Button>
            <Button size="lg" variant="outline" href="/habitaciones">
              Ver habitaciones
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
