import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  it('incluye el índice /blog', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls).toContain('https://hostalnomadard.com/blog')
  })
  it('incluye todas las URLs de posts existentes', () => {
    const { getAllPosts } = require('@/lib/blog')
    const slugs = getAllPosts().map((p: { slug: string }) => p.slug)
    const urls = sitemap().map((e) => e.url)
    for (const slug of slugs) {
      expect(urls).toContain(`https://hostalnomadard.com/blog/${slug}`)
    }
  })
})
