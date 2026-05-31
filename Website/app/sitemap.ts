import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hostalnomadard.com'

  return [
    {
      url: base,
      lastModified: '2026-05-28',
    },
    {
      url: `${base}/habitaciones`,
      lastModified: '2026-05-28',
    },
    {
      url: `${base}/reservar`,
      lastModified: '2026-05-28',
    },
    {
      url: `${base}/nosotros`,
      lastModified: '2026-05-28',
    },
    {
      url: `${base}/contacto`,
      lastModified: '2026-05-28',
    },
    {
      url: `${base}/cerveceria`,
      lastModified: '2026-05-30',
    },
  ]
}
