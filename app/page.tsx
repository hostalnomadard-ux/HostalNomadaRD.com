import type { Metadata } from 'next'
import { lodgingSchema } from '@/lib/seo'
import { Hero } from '@/components/home/Hero'
import { RoomsPreview } from '@/components/home/RoomsPreview'
import { Amenities } from '@/components/home/Amenities'
import { Reviews } from '@/components/home/Reviews'
import { LocationSection } from '@/components/home/LocationSection'

export const metadata: Metadata = {
  title: 'Hostal Nómada — Santiago de los Caballeros, RD',
  description:
    'Hostal boutique en edificio colonial de 75+ años. Habitaciones privadas y compartidas en el centro histórico de Santiago de los Caballeros, República Dominicana.',
  openGraph: {
    title: 'Hostal Nómada — Santiago de los Caballeros, RD',
    description: 'Edificio colonial restaurado en el corazón histórico de Santiago, RD.',
    url: 'https://hostalnomadard.com',
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
      <RoomsPreview />
      <Amenities />
      <Reviews />
      <LocationSection />
    </>
  )
}
