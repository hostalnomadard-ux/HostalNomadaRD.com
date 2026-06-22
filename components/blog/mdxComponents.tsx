import Link from 'next/link'
import type { ComponentProps } from 'react'

function A({ href = '', ...props }: ComponentProps<'a'>) {
  const isInternal = href.startsWith('/')
  if (isInternal) {
    return <Link href={href} className="text-verde-fresco underline underline-offset-2 hover:text-verde-fresco-dark" {...props} />
  }
  return <a href={href} rel="noopener noreferrer" target="_blank" className="text-verde-fresco underline underline-offset-2 hover:text-verde-fresco-dark" {...props} />
}

export function BlogCTA() {
  return (
    <aside className="my-10 rounded-2xl bg-verde-fresco-light p-6 md:p-8">
      <p className="text-verde-fresco-dark font-semibold text-sm uppercase tracking-wider mb-2">
        Tu base en el centro histórico
      </p>
      <h3 className="text-2xl font-bold text-carbon mb-3">
        Hospédate en Hostal Nómada
      </h3>
      <p className="text-carbon/70 leading-relaxed mb-5 max-w-2xl">
        Edificio Art Déco de 1948 en pleno centro de Santiago, a pasos de todo lo que cuenta esta guía. Habitaciones privadas y compartidas, con Cervecería Búcaro en el mismo edificio.
      </p>
      <Link
        href="/reservar"
        className="inline-block bg-verde-fresco text-white font-semibold px-6 py-3 rounded-md hover:bg-verde-fresco-dark transition-colors duration-200"
      >
        Ver disponibilidad
      </Link>
    </aside>
  )
}

export const mdxComponents = {
  h2: (p: ComponentProps<'h2'>) => <h2 className="text-3xl font-bold text-carbon mt-12 mb-4 scroll-mt-24" {...p} />,
  h3: (p: ComponentProps<'h3'>) => <h3 className="text-2xl font-semibold text-carbon mt-8 mb-3" {...p} />,
  p: (p: ComponentProps<'p'>) => <p className="text-carbon/80 leading-relaxed mb-5" {...p} />,
  ul: (p: ComponentProps<'ul'>) => <ul className="list-disc pl-6 mb-5 space-y-2 text-carbon/80" {...p} />,
  ol: (p: ComponentProps<'ol'>) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-carbon/80" {...p} />,
  li: (p: ComponentProps<'li'>) => <li className="leading-relaxed" {...p} />,
  a: A,
  blockquote: (p: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-verde-fresco pl-4 italic text-carbon/70 my-6" {...p} />
  ),
  strong: (p: ComponentProps<'strong'>) => <strong className="font-semibold text-carbon" {...p} />,
  BlogCTA,
}
