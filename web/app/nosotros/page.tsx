import type { Metadata } from 'next'
import { Heart, Home, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quiénes Somos — Hostal Nómada Santiago RD',
  description:
    'Conoce a los anfitriones de Hostal Nómada — una pareja joven apasionada por el turismo local en Santiago de los Caballeros, RD. 14 años de experiencia como anfitriones.',
  openGraph: {
    title: 'Quiénes Somos — Hostal Nómada Santiago RD',
    description: 'Pareja joven apasionada por el turismo local en Santiago, RD. 14 años de experiencia. Edificio Art Déco de 1948 restaurado.',
    url: 'https://hostalnomadard.com/nosotros',
    images: [{ url: '/images/fachada-esquina.png', width: 1200, height: 630, alt: 'Fachada Hostal Nómada — Santiago RD' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/fachada-esquina.png'] },
  alternates: { canonical: 'https://hostalnomadard.com/nosotros' },
}

const values = [
  {
    icon: Home,
    title: 'Historia viva',
    text: 'Nuestro edificio tiene más de 75 años. Nació como hospital, fue abandonado por más de 20 años, y lo restauramos conservando su alma colonial.',
  },
  {
    icon: Heart,
    title: 'Gestión personal',
    text: 'Somos una pareja joven que vive en el hostal con nuestros 2 perros. Respondemos en menos de una hora y estamos aquí para lo que necesites.',
  },
  {
    icon: Globe,
    title: 'Viajeros para viajeros',
    text: 'Diseñado para el viajero moderno que quiere explorar Santiago auténticamente — no desde un resort, sino desde el corazón de la ciudad.',
  },
]

export default function NosotrosPage() {
  return (
    <div className="py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Hostal Nómada — Quiénes Somos</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Nómada es un hostal acogedor en el centro histórico de Santiago, RD, gestionado por una
            pareja joven que vive aquí con sus 2 perros.
          </p>
        </div>

        <div className="bg-verde-fresco rounded-2xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">El edificio</h2>
          <p className="text-white/90 leading-relaxed text-lg">
            Con más de 75 años de historia, este emblemático edificio comenzó como un hospital y ha
            sido restaurado tras permanecer abandonado por más de 20 años. Su arquitectura conserva
            el encanto colonial con toques modernos. La fachada en tonos verdes y detalles azules
            destaca en un entorno urbano rodeado de calles peatonales y luces colgantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-cream rounded-xl p-6">
              <Icon size={28} className="text-verde-fresco mb-4" />
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-gray-500">
          <p>14 años como anfitriones · Hablamos español e inglés · Respuesta en &lt;1 hora</p>
        </div>
      </div>
    </div>
  )
}
