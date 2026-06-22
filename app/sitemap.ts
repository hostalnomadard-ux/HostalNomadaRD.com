import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hostalnomadard.com'

  const posts = getAllPosts()
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updated),
    changeFrequency: 'monthly',
    priority: post.hub ? 0.8 : 0.7,
  }))

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
    {
      url: base + '/blog',
      lastModified: posts[0] ? new Date(posts[0].updated) : new Date('2026-06-20'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
  ]
}
