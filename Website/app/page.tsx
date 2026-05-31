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
  title: 'Hostal Nómada — Santiago de los Caballeros, RD',
  description:
    'Hostal boutique en edificio Art Déco de 1948. Habitaciones privadas y compartidas en el centro histórico de Santiago de los Caballeros, RD. Cervecería Búcaro en el mismo espacio.',
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'Hostal Nómada',
    title: 'Hostal Nómada — Santiago de los Caballeros, RD',
    description:
      'Edificio Art Déco de 1948 en el corazón histórico de Santiago, RD. Hostal + Cervecería Búcaro.',
    url: 'https://hostalnomadard.com',
    images: [
      {
        url: '/images/fachada.jpg',
        width: 1200,
        height: 630,
        alt: 'Hostal Nómada — Edificio Art Déco 1948, Centro Histórico Santiago de los Caballeros, RD',
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
