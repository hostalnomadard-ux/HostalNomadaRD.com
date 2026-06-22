import sitemap from '@/app/sitemap'
import { getAllPosts } from '@/lib/blog'

describe('sitemap', () => {
  it('incluye el índice /blog', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls).toContain('https://hostalnomadard.com/blog')
  })
  it('incluye todas las URLs de posts existentes', () => {
    const slugs = getAllPosts().map((p: { slug: string }) => p.slug)
    const urls = sitemap().map((e) => e.url)
    for (const slug of slugs) {
      expect(urls).toContain(`https://hostalnomadard.com/blog/${slug}`)
    }
  })
})
