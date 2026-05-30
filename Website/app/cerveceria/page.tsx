import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Cervecería Búcaro',
  description:
    'Cervecería artesanal Búcaro en Hostal Nómada — edificio Art Déco de 1948 en el centro histórico de Santiago de los Caballeros, República Dominicana.',
}

export default function CerveceriaPage() {
  return (
    <div className="py-16 min-h-screen bg-nomada-cream">
      <div className="max-w-4xl mx-auto px-4">

        <div className="text-center mb-12">
          <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Hostal Nómada · Santiago, RD
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cervecería Búcaro
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Cervecería artesanal ubicada en el mismo edificio Art Déco de 1948 que alberga
            Hostal Nómada, en el corazón del Centro Histórico de Santiago de los Caballeros.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">El espacio</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Cervecería Búcaro comparte el alma del edificio que la aloja: construido en 1948 por
            el arquitecto Pablo N. Pérez Rancier para el Dr. José de Jesús Jiménez Almonte —
            cardiólogo, botánico y campeón nacional de ajedrez. La orquídea endémica dominicana{' '}
            <em>Tolumnia jimenezii</em> lleva su nombre. Tras décadas de abandono, el edificio fue
            restaurado y hoy alberga tanto el hostal como la cervecería.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mt-4">
            La cervecería está disponible para huéspedes del hostal y para visitantes externos.
            Para reservas de grupos o consultas sobre el menú de cervezas artesanales, contáctanos
            directamente por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-3xl mb-3">🍺</p>
            <h3 className="font-bold text-gray-900 mb-2">Cervezas artesanales</h3>
            <p className="text-gray-500 text-sm">Producción local. Rotación de estilos.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-3xl mb-3">🏛️</p>
            <h3 className="font-bold text-gray-900 mb-2">Edificio histórico</h3>
            <p className="text-gray-500 text-sm">Art Déco 1948. Centro Histórico de Santiago.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <p className="text-3xl mb-3">📍</p>
            <h3 className="font-bold text-gray-900 mb-2">Acceso</h3>
            <p className="text-gray-500 text-sm">
              C/ Benito Monción 29, esq. Máximo Gómez 34.
            </p>
          </div>
        </div>

        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="https://wa.me/18297557202" size="lg">
            Consultar por WhatsApp
          </Button>
          <Button href="/reservar" variant="outline" size="lg">
            Reservar en el hostal →
          </Button>
        </div>

      </div>
    </div>
  )
}
