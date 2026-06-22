import Link from 'next/link'
import type { PostMeta } from '@/lib/blog'
import { BlogCover } from '@/components/blog/BlogCover'

export function PostCard({ meta }: { meta: PostMeta }) {
  return (
    <Link
      href={`/blog/${meta.slug}`}
      className="group block rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative aspect-[16/9]">
        <BlogCover meta={meta} variant="card" />
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold text-carbon leading-snug mb-2 group-hover:text-verde-fresco transition-colors">
          {meta.title}
        </h2>
        <p className="text-carbon/60 text-sm leading-relaxed line-clamp-3">{meta.description}</p>
        <p className="mt-3 text-xs text-carbon/40">{meta.readingMinutes} min · {meta.updated}</p>
      </div>
    </Link>
  )
}
