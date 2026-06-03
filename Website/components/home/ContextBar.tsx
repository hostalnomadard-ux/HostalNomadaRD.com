const signals = [
  '📍 Centro Histórico',
  '🍺 Cervecería Búcaro',
  '🔐 Smart Lock 24h',
  '🐾 Mascotas OK',
  '✔ 14 años de anfitriones',
  '💳 Check-in 15:00–23:00',
]

export function ContextBar() {
  return (
    <div className="bg-carbon py-3 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-white/90 text-sm font-medium">
          {signals.map((s, i) => (
            <span key={i} className="whitespace-nowrap">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
