import type { Metadata } from 'next'
import { SirvoyWidget } from '@/components/SirvoyWidget'

export const metadata: Metadata = {
  title: 'Reservar',
  description:
    'Reserva tu habitación en Hostal Nómada. Disponibilidad en tiempo real. Confirmación inmediata.',
}

export default function ReservarPage() {
  const engineId = process.env.NEXT_PUBLIC_SIRVOY_ENGINE_ID ?? ''

  return (
    <div className="py-16 bg-nomada-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Reservar</h1>
          <p className="text-gray-600">
            Check-in: 3:00pm – 11:00pm &nbsp;·&nbsp; Check-out: hasta las 11:00am
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <SirvoyWidget engineId={engineId} />
        </div>
      </div>
    </div>
  )
}
