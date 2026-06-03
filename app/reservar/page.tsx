import type { Metadata } from 'next'
import { SirvoyWidget } from '@/components/SirvoyWidget'

export const metadata: Metadata = {
  title: 'Reservar Habitación — Hostal Nómada, Santiago de los Caballeros RD',
  description:
    'Reserva tu habitación en Hostal Nómada, edificio Art Déco 1948, centro histórico Santiago RD. Habitaciones privadas desde DOP 2,500. Compartidas desde DOP 900.',
  openGraph: {
    title: 'Reservar Habitación — Hostal Nómada, Santiago de los Caballeros RD',
    description: 'Reserva tu habitación en Hostal Nómada, edificio Art Déco 1948, centro histórico Santiago RD. Habitaciones privadas desde DOP 2,500. Compartidas desde DOP 900.',
    url: 'https://hostalnomadard.com/reservar',
    images: [{ url: '/images/fachada-esquina.png', width: 1200, height: 630, alt: 'Hostal Nómada — Santiago RD' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/fachada-esquina.png'] },
  alternates: { canonical: 'https://hostalnomadard.com/reservar' },
}

export default function ReservarPage() {
  const engineId = process.env.NEXT_PUBLIC_SIRVOY_ENGINE_ID ?? ''

  return (
    <div className="py-16 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Reserva tu habitación</h1>
          <p className="text-gray-600">
            Check-in: 3:00 PM – 11:00 PM &nbsp;·&nbsp; Check-out: hasta las 11:00 AM
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <SirvoyWidget engineId={engineId} />
        </div>
      </div>
    </div>
  )
}
