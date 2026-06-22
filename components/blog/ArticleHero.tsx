import Link from 'next/link'
import type { PostMeta } from '@/lib/blog'
import { BlogCover } from '@/components/blog/BlogCover'

export function ArticleHero({ meta }: { meta: PostMeta }) {
  return (
    <section className="relative overflow-hidden bg-carbon py-20 px-4">
      <BlogCover meta={meta} variant="hero" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <nav className="mb-6 text-sm text-white/40" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white/70 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{meta.title}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">{meta.title}</h1>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-6">{meta.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/40">
          <time dateTime={meta.updated}>Actualizado: {meta.updated}</time>
          <span>·</span>
          <span>{meta.readingMinutes} min de lectura</span>
        </div>
      </div>
    </section>
  )
}
