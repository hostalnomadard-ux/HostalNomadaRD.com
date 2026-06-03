export function MarqueeBand() {
  const text =
    'SANTIAGO · 1948 · ART DÉCO · BENITO MONCIÓN 34 · CERVECERÍA BÚCARO · CENTRO HISTÓRICO · '

  return (
    <div
      className="bg-carbon border-b border-white/5 overflow-hidden py-2.5 select-none"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
        <span className="text-white/35 text-[10px] font-bold tracking-[0.3em] uppercase">
          {text}
        </span>
        <span className="text-white/35 text-[10px] font-bold tracking-[0.3em] uppercase">
          {text}
        </span>
      </div>
    </div>
  )
}
