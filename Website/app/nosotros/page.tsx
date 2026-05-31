import type { Metadata } from 'next'
import { Heart, Home, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce la historia de Hostal Nómada — una pareja joven apasionada por el turismo local en Santiago de los Caballeros, RD. Edificio Art Déco de 1948.',
}

const values = [
  {
    icon: Home,
    title: 'Historia viva',
    text: 'Nuestro edificio fue diseñado en 1948 por el arquitecto Pablo N. Pérez Rancier como consultorio médico y residencia del Dr. José de Jesús Jiménez Almonte. Abandonado por más de 20 años, lo restauramos preservando su alma Art Déco.',
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nuestra historia</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Nómada es un hostal acogedor en el centro histórico de Santiago, RD, gestionado por una
            pareja joven que vive aquí con sus 2 perros.
          </p>
        </div>

        <div className="bg-nomada-green rounded-2xl p-8 md:p-12 text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">El edificio</h2>
          <p className="text-nomada-sage leading-relaxed text-lg">
            Este edificio Art Déco fue diseñado en 1948 por el arquitecto Pablo N. Pérez Rancier
            para el Dr. José de Jesús Jiménez Almonte — cardiólogo, botánico y campeón nacional
            dominicano de ajedrez. La orquídea endémica dominicana{' '}
            <em>Tolumnia jimenezii</em> lleva su nombre. El edificio figura en la Guía de
            Arquitectura de Santiago, página 105.
          </p>
          <p className="text-nomada-sage leading-relaxed text-lg mt-4">
            Tras décadas de abandono, fue restaurado por sus actuales propietarios conservando la
            fachada original, los detalles en hierro forjado y la disposición interior. Hoy alberga
            el hostal y la Cervecería Búcaro en el mismo espacio donde el Dr. Jiménez Almonte
            atendió pacientes hace más de 75 años.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-nomada-cream rounded-xl p-6">
              <Icon size={28} className="text-nomada-green mb-4" />
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
