import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import { ArticleHero } from '@/components/blog/ArticleHero'
import { mdxComponents } from '@/components/blog/mdxComponents'
import FaqAccordion from '@/components/blog/FaqAccordion'

const BASE = 'https://hostalnomadard.com'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let meta
  try {
    meta = getPostBySlug(slug).meta
  } catch {
    return {}
  }
  const url = `${BASE}/blog/${slug}`
  return {
    title: meta.title,
    description: meta.description,
    keywords: [meta.keywordPrimary, ...meta.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.description,
      url,
      publishedTime: meta.date,
      modifiedTime: meta.updated,
      images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.title }],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }
  const { meta, content } = post!
  const url = `${BASE}/blog/${slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated,
    image: meta.ogImage.startsWith('http') ? meta.ogImage : `${BASE}${meta.ogImage}`,
    author: { '@type': 'Organization', name: 'Hostal Nómada', url: BASE },
    publisher: { '@type': 'Organization', name: 'Hostal Nómada', url: BASE },
    mainEntityOfPage: url,
    inLanguage: 'es-DO',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: meta.title, item: url },
    ],
  }

  const faqSchema =
    meta.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: meta.faq.map((f) => ({
            '@type': 'Question',
            name: f.pregunta,
            acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
          })),
        }
      : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <ArticleHero meta={meta} />

      <article className="py-12 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </article>

      {meta.faq.length > 0 && <FaqAccordion faqs={meta.faq} />}
    </>
  )
}
