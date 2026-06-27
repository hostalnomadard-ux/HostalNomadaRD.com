import type { PostMeta } from '@/lib/blog'

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/**
 * Portada animada y temática por artículo.
 * - Fondo carbón → color de acento del tema (coverColor)
 * - Sol naciente Art Déco (rayos) que gira muy lento
 * - Halo de acento que deriva suavemente
 * - Emoji del tema (coverEmoji) flotando
 * Respeta prefers-reduced-motion (animaciones definidas en globals.css).
 */
export function BlogCover({
  meta,
  variant = 'card',
}: {
  meta: PostMeta
  variant?: 'card' | 'hero'
}) {
  const [r, g, b] = hexToRgb(meta.coverColor)
  const rgb = `${r}, ${g}, ${b}`
  const isHero = variant === 'hero'
  const rays = Array.from({ length: 24 })

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(130% 120% at 78% 8%, rgba(${rgb}, 0.55), transparent 52%), linear-gradient(135deg, #15150f 0%, #1A1A1A 58%, rgba(${rgb}, 0.22) 100%)`,
      }}
    >
      {/* Sol naciente Art Déco */}
      <svg
        className="bc-spin absolute -right-[18%] -top-[42%] h-[180%] w-[80%] opacity-[0.18]"
        viewBox="0 0 200 200"
        fill="none"
      >
        {rays.map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2="100"
            y2="-40"
            stroke={meta.coverColor}
            strokeWidth={i % 2 === 0 ? 4 : 1.5}
            transform={`rotate(${(360 / 24) * i} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="26" stroke={meta.coverColor} strokeWidth="2" />
        <circle cx="100" cy="100" r="40" stroke={meta.coverColor} strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Halo de acento que deriva */}
      <div
        className="bc-drift absolute left-[-10%] bottom-[-30%] h-[80%] w-[60%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(${rgb}, 0.5), transparent 70%)` }}
      />

      {/* Emoji del tema */}
      <div
        className={`absolute select-none ${
          isHero ? 'right-10 top-1/2 -translate-y-1/2 hidden sm:block' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        }`}
      >
        <span
          className="bc-bob block drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
          style={{ fontSize: isHero ? '5.5rem' : '4rem', lineHeight: 1 }}
        >
          {meta.coverEmoji}
        </span>
      </div>

      {/* Sello de marca */}
      <span className="absolute bottom-3 right-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
        Hostal Nómada · Blog
      </span>

      {/* Velo inferior para legibilidad si se superpone texto */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
    </div>
  )
}
