export function HistorySection() {
  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Foto / Blueprint placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-carbon flex items-end">
              {/* Blueprint pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `
                    repeating-linear-gradient(0deg, #2B5DB8 0px, #2B5DB8 1px, transparent 1px, transparent 40px),
                    repeating-linear-gradient(90deg, #2B5DB8 0px, #2B5DB8 1px, transparent 1px, transparent 40px)
                  `,
                  backgroundColor: '#0A2463',
                }}
              />
              {/* Rooms layout hint from original blueprint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="border border-blue-400 w-48 h-32 relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-blue-400" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-blue-400" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-400" />
                  <div className="absolute top-0 bottom-0 left-1/3 w-px bg-blue-400" />
                  <span className="absolute top-2 left-2 text-blue-300 text-[8px] font-mono">Consultas</span>
                  <span className="absolute bottom-2 left-2 text-blue-300 text-[8px] font-mono">Laboratorio</span>
                  <span className="absolute top-2 right-2 text-blue-300 text-[8px] font-mono">Sala de Espera</span>
                </div>
              </div>
              <div className="relative p-8 text-white/60 text-xs font-mono leading-relaxed">
                Proyecto: Consultoría y Residencia<br />
                Arq. Pablo N. Pérez Rancier<br />
                Santiago, R.D. — Mayo 1, 1948
              </div>
            </div>

            {/* Badge patrimonio */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
              <p className="text-verde-fresco font-bold text-sm">Patrimonio Histórico</p>
              <p className="text-gray-500 text-xs">Guía de Arquitectura · Pág. 105</p>
            </div>
          </div>

          {/* Texto editorial */}
          <div className="order-1 lg:order-2">
            <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Construido en 1948 · Art Déco caribeño
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-carbon leading-tight mb-6">
              De consultorio a punto de encuentro.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              El arquitecto <strong className="text-carbon">Pablo N. Pérez Rancier</strong> diseñó
              este edificio para el <strong className="text-carbon">Dr. José de Jesús Jiménez
              Almonte</strong> — médico internista, botánico reconocido y campeón nacional de ajedrez.
            </p>

            <p className="text-gray-600 leading-relaxed mb-10">
              Aquí vivió, trabajó y escribió parte de la flora dominicana. En su terraza,
              Santiago debatía ciencia y movía piezas de ajedrez. La{' '}
              <em>Tolumnia jimenezii</em>, una orquídea endémica, lleva su nombre.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-verde-fresco pl-6 py-2 mb-10">
              <p className="text-carbon text-xl font-bold leading-snug italic">
                "Un médico que curaba corazones.<br />
                Un botánico que nombraba orquídeas.<br />
                Esta fue su casa. Ahora es la tuya."
              </p>
            </blockquote>

            {/* Timeline */}
            <div className="flex flex-col gap-4">
              {[
                { year: '1948', event: 'Construcción — Arq. Pérez Rancier diseña consultoría + residencia Art Déco' },
                { year: '1966', event: 'El Dr. Jiménez funda la primera unidad de cardiología en Santiago' },
                { year: '1980', event: 'Premio Nacional de Ciencias de la República Dominicana' },
                { year: 'Hoy',  event: 'Hostal Nómada + Cervecería Búcaro — el espíritu de encuentro continúa' },
              ].map(({ year, event }) => (
                <div key={year} className="flex gap-4 items-start">
                  <span className="text-xs font-bold text-verde-fresco w-10 shrink-0 pt-0.5 tabular-nums">
                    {year}
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">{event}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
