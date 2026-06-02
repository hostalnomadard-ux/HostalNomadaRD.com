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
    default: 'Hostal Nómada — Hospedaje Boutique en Santiago de los Caballeros, RD',
    template: '%s | Hostal Nómada — Santiago RD',
  },
  description:
    'Hostal boutique en edificio Art Déco de 1948 en el centro histórico de Santiago de los Caballeros, República Dominicana. Habitaciones privadas y compartidas con carácter. Cervecería Búcaro.',
  verification: {
    google: 'googlefd4e76e26e641327.html',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'Hostal Nómada',
    images: [
      {
        url: '/images/fachada-esquina.png',
        width: 1200,
        height: 630,
        alt: 'Fachada Art Déco Hostal Nómada — Centro Histórico Santiago, RD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hostal Nómada — Hospedaje Boutique en Santiago RD',
    description: 'Edificio Art Déco de 1948 + Cervecería Búcaro. ⭐ 4.64 · 457 reseñas. Centro Histórico Santiago, RD.',
    images: ['https://hostalnomadard.com/images/fachada-esquina.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
