import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hostalnomadard.com'),
  title: {
    default: 'Hostal Nómada — Santiago de los Caballeros, RD',
    template: '%s | Hostal Nómada',
  },
  description:
    'Hostal boutique en edificio Art Déco de 1948 en el centro histórico de Santiago de los Caballeros, República Dominicana. Habitaciones privadas con carácter.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://hostalnomadard.com',
    languages: {
      'es-DO': 'https://hostalnomadard.com',
      'x-default': 'https://hostalnomadard.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'Hostal Nómada',
    images: [
      {
        url: '/images/fachada.jpg',
        width: 1200,
        height: 630,
        alt: 'Hostal Nómada — Edificio Art Déco 1948, Centro Histórico Santiago de los Caballeros, RD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@HostalNomadaRD',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hostal Nómada',
    url: 'https://hostalnomadard.com',
    inLanguage: 'es',
  }

  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <head>
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://secured.sirvoy.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
