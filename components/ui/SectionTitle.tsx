import { clsx } from 'clsx'

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export function SectionTitle({ title, subtitle, centered = false, light = false }: SectionTitleProps) {
  return (
    <div className={clsx('mb-10', centered && 'text-center')}>
      <h2 className={clsx('text-3xl md:text-4xl font-bold', light ? 'text-white' : 'text-gray-900')}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx('mt-3 text-lg', light ? 'text-nomada-sage' : 'text-gray-600')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
