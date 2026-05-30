import Image from 'next/image'

export function HistorySection() {
  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Plano blueprint */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-blueprint-blue">
              <Image
                src="/images/plano-blueprint.jpg"
                alt="Plano original 1948 — Arq. Pablo N. Pérez Rancier, Planta Primer Nivel"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Badge entrada */}
            <div className="absolute -bottom-4 -right-4 overflow-hidden rounded-xl shadow-lg border border-gray-100 w-24 h-24">
              <Image
                src="/images/entrada.jpg"
                alt="Entrada Art Déco #34 — Hostal Nómada"
                fill
                className="object-cover"
              />
            </div>

            {/* Badge patrimonio */}
            <div className="absolute -top-3 -left-3 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
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
