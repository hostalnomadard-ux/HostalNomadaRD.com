import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { PostCard } from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: 'Blog de viaje · Santiago de los Caballeros',
  description:
    'Guías de viaje sobre Santiago de los Caballeros, RD: qué hacer, dónde comer, cómo llegar, vida nocturna y cultura — por Hostal Nómada.',
  alternates: { canonical: 'https://hostalnomadard.com/blog' },
  openGraph: {
    title: 'Blog de viaje sobre Santiago de los Caballeros | Hostal Nómada',
    description:
      'Guías locales para descubrir Santiago de los Caballeros, RD: qué hacer, dónde comer, cómo llegar y más.',
    url: 'https://hostalnomadard.com/blog',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const hub = posts.find((p) => p.hub)
  const rest = posts.filter((p) => !p.hub)

  return (
    <>
      <section className="bg-carbon py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-verde-fresco font-semibold text-sm uppercase tracking-wider mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Guías de viaje de Santiago de los Caballeros
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            Qué hacer, dónde comer, cómo moverte y los rincones que solo conocen los locales — escrito desde el centro histórico.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-carbon/60">Pronto publicaremos las primeras guías.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hub && (
                <div className="md:col-span-2 lg:col-span-3">
                  <PostCard meta={hub} />
                </div>
              )}
              {rest.map((meta) => (
                <PostCard key={meta.slug} meta={meta} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
