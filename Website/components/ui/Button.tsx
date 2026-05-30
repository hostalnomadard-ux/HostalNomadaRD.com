import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'royal' | 'outline-white'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type ButtonAsLink = {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: React.ReactNode
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:         'bg-verde-fresco text-white hover:bg-verde-fresco-dark',
  outline:         'border-2 border-verde-fresco text-verde-fresco hover:bg-verde-fresco-light',
  ghost:           'text-verde-fresco hover:bg-verde-fresco-light',
  royal:           'bg-royal-blue text-white hover:bg-royal-blue-dark',
  'outline-white': 'border-2 border-white text-white hover:bg-white/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg font-semibold',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde-fresco disabled:opacity-50'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = twMerge(
    clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
