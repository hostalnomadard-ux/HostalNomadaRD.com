import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hostalnomadard.com'

  return [
    {
      url: base,
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: base + '/habitaciones',
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: base + '/reservar',
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: base + '/cerveceria',
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: base + '/nosotros',
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: base + '/contacto',
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
}
