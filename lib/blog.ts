import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type Audience = 'intl' | 'domestic' | 'both'
export interface FAQ {
  pregunta: string
  respuesta: string
}
export interface PostMeta {
  title: string
  slug: string
  description: string
  keywordPrimary: string
  keywords: string[]
  date: string
  updated: string
  audience: Audience
  ogImage: string
  hub: boolean
  related: string[]
  faq: FAQ[]
  readingMinutes: number
  coverColor: string
  coverEmoji: string
  coverImage: string | null
}
export interface Post {
  meta: PostMeta
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const DEFAULT_OG = '/images/fachada-esquina.png'

function toISODate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function parsePost(raw: string, slug: string): Post {
  const { data, content } = matter(raw)
  const required = ['title', 'description', 'keywordPrimary', 'date', 'audience'] as const
  for (const key of required) {
    if (!data[key]) {
      throw new Error(`Post "${slug}": falta el campo de frontmatter requerido "${key}"`)
    }
  }
  const meta: PostMeta = {
    title: data.title,
    slug,
    description: data.description,
    keywordPrimary: data.keywordPrimary,
    keywords: data.keywords ?? [],
    date: toISODate(data.date),
    updated: data.updated ? toISODate(data.updated) : toISODate(data.date),
    audience: data.audience,
    ogImage: data.ogImage ?? DEFAULT_OG,
    hub: data.hub ?? false,
    related: data.related ?? [],
    faq: data.faq ?? [],
    readingMinutes: Math.max(1, Math.round(Number(data.readingMinutes ?? readingTime(content)))),
    coverColor: data.coverColor ?? '#52B788',
    coverEmoji: data.coverEmoji ?? '🧭',
    coverImage: data.coverImage ?? null,
  }
  return { meta, content }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .sort()
}

export function getPostBySlug(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8')
  return parsePost(raw, slug)
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
