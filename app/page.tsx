import type { Metadata } from 'next'
import { lodgingSchema } from '@/lib/seo'
import { Hero } from '@/components/home/Hero'
import { ContextBar } from '@/components/home/ContextBar'
import { HistorySection } from '@/components/home/HistorySection'
import { RoomsPreview } from '@/components/home/RoomsPreview'
import { Amenities } from '@/components/home/Amenities'
import { NeighborhoodSection } from '@/components/home/NeighborhoodSection'
import { Reviews } from '@/components/home/Reviews'
import { FinalCTA } from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'Hostal Nómada — Hospedaje Boutique en Santiago de los Caballeros, RD',
  description:
    'Hostal boutique en edificio Art Déco de 1948. Habitaciones privadas y compartidas en el centro histórico de Santiago, RD. Cervecería Búcaro en el mismo espacio. ⭐ 4.64 · 457 reseñas.',
  openGraph: {
    title: 'Hostal Nómada — Hospedaje Boutique en Santiago de los Caballeros, RD',
    description:
      'Edificio Art Déco de 1948 en el corazón histórico de Santiago, RD. Hostal boutique + Cervecería Búcaro. ⭐ 4.64 · 457 reseñas.',
    url: 'https://hostalnomadard.com',
    images: [
      {
        url: '/images/fachada-esquina.png',
        width: 1200,
        height: 630,
        alt: 'Fachada Art Déco Hostal Nómada — esquina Benito Monción y Máximo Gómez, Santiago RD',
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
      />
      <Hero />
      <ContextBar />
      <HistorySection />
      <RoomsPreview />
      <Amenities />
      <NeighborhoodSection />
      <Reviews />
      <FinalCTA />
    </>
  )
}
