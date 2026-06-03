import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cervecería Búcaro — Hostal Nómada, Santiago RD',
  description: 'Cervecería artesanal en el corazón del centro histórico de Santiago de los Caballeros. Cervezas artesanales dominicanas, ambiente colonial. En el mismo edificio Art Déco que Hostal Nómada.',
  openGraph: {
    title: 'Cervecería Búcaro — Santiago de los Caballeros, RD',
    description: 'Cervecería artesanal en edificio Art Déco 1948. Centro Histórico Santiago, RD.',
    url: 'https://hostalnomadard.com/cerveceria',
    images: [{ url: '/images/fachada-esquina.png', width: 1200, height: 630, alt: 'Cervecería Búcaro — Hostal Nómada, Santiago RD' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/fachada-esquina.png'] },
  alternates: { canonical: 'https://hostalnomadard.com/cerveceria' },
}

const cerveceriaSchema = {
  '@context': 'https://schema.org',
  '@type': 'BarOrPub',
  name: 'Cervecería Búcaro',
  description: 'Cervecería artesanal en el centro histórico de Santiago de los Caballeros, República Dominicana.',
  url: 'https://hostalnomadard.com/cerveceria',
  telephone: '+18297557202',
  image: 'https://hostalnomadard.com/images/fachada-esquina.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C/ Benito Monción 29, esq. Máximo Gómez 34',
    addressLocality: 'Santiago de los Caballeros',
    addressRegion: 'Santiago',
    postalCode: '51000',
    addressCountry: 'DO',
  },
  servesCuisine: 'Cerveza artesanal',
  sameAs: ['https://hostalnomadard.com'],
}

export default function CerveceriaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cerveceriaSchema) }}
      />
      <div className="py-16 min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-carbon mb-4">
              Cervecería Búcaro
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Cervecería artesanal en el corazón del centro histórico de Santiago de los Caballeros, República Dominicana.
            </p>
          </div>
          <div className="bg-blueprint-blue rounded-2xl p-8 md:p-12 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">En el mismo edificio Art Déco de 1948</h2>
            <p className="text-white/90 leading-relaxed text-lg">
              Búcaro comparte espacio con Hostal Nómada en el emblemático edificio de la esquina de
              Benito Monción y Máximo Gómez. Cervezas artesanales dominicanas, ambiente colonial y la
              historia viva del centro histórico de Santiago.
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Más información próximamente. ¡Visítanos!</p>
          </div>
        </div>
      </div>
    </>
  )
}
