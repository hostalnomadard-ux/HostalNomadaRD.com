const places = [
  { emoji: '🍻', distance: '1 min',  name: 'Bares de Benito Monción',           detail: 'en tu puerta' },
  { emoji: '🍽️', distance: '2 min',  name: 'Mejores restaurantes del centro',   detail: 'a pie' },
  { emoji: '🏛️', distance: '2 min',  name: 'Monumento a los Héroes',            detail: 'caminando' },
  { emoji: '🌳', distance: '5 min',  name: 'Parque Duarte',                     detail: 'a pie' },
  { emoji: '🏦', distance: '3 min',  name: 'Banco, farmacia, supermercado',     detail: 'a pie' },
  { emoji: '✈️', distance: '25 min', name: 'Aeropuerto Internacional Cibao',    detail: 'en taxi' },
]

export function NeighborhoodSection() {
  return (
    <section className="py-20 bg-carbon">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Texto + lista */}
          <div>
            <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Ubicación
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              A pasos de todo.
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Estás en el corazón del centro histórico.
              No en las afueras.
            </p>

            <div className="flex flex-col gap-4">
              {places.map(({ emoji, distance, name, detail }) => (
                <div key={name} className="flex items-center gap-4">
                  <span className="text-xl w-8 text-center shrink-0">{emoji}</span>
                  <div className="flex items-baseline gap-2 flex-1 min-w-0">
                    <span className="text-verde-fresco font-bold text-sm w-14 shrink-0 tabular-nums">
                      {distance}
                    </span>
                    <span className="text-white font-medium text-sm truncate">{name}</span>
                    <span className="text-gray-500 text-xs shrink-0">{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="rounded-2xl overflow-hidden h-80 lg:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8!2d-70.7066258!3d19.4521542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1cf61a5f6a4ed%3A0xc4a749097ca77d4a!2sHostal%20N%C3%B3mada%20-%20Santiago%20de%20los%20Caballeros!5e0!3m2!1ses!2sdo!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) contrast(110%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Hostal Nómada"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
