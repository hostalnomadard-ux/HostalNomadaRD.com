import { MessageCircle } from 'lucide-react'

export function HostsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Texto */}
          <div>
            <p className="text-verde-fresco text-xs font-semibold tracking-[0.2em] uppercase mb-4">Anfitriones</p>
            <h2 className="text-4xl md:text-5xl font-bold text-carbon leading-tight mb-6">
              Tus anfitriones viven aquí.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Somos una pareja joven que restauró este edificio y decidió quedarse.
              No gestionamos el hostal a distancia — vivimos en él, con nuestros dos perros,
              y estamos disponibles para lo que necesites.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              14 años recibiendo viajeros de todo el mundo nos enseñaron que la mejor estadía
              empieza con buenos anfitriones. Respondemos en menos de una hora,
              hablamos español e inglés, y conocemos Santiago mejor que cualquier guía.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <p className="text-3xl font-bold text-carbon">14</p>
                <p className="text-sm text-gray-500">años como anfitriones</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-carbon">457</p>
                <p className="text-sm text-gray-500">reseñas en Airbnb + Hostelworld</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-carbon">4.64</p>
                <p className="text-sm text-gray-500">calificación promedio</p>
              </div>
            </div>

            <a
              href="https://wa.me/18297557202"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-verde-fresco text-white font-semibold px-6 py-3 rounded-md hover:bg-verde-fresco-dark transition-colors"
            >
              <MessageCircle size={18} />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Card anfitriones */}
          <div className="bg-cream rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-verde-fresco-light flex items-center justify-center text-2xl">
                🏡
              </div>
              <div>
                <p className="font-bold text-carbon text-lg">Javier y Familia</p>
                <p className="text-sm text-gray-500">Anfitriones · Santiago, RD</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-verde-fresco mt-0.5">✓</span>
                <span>Vivimos en el hostal — presencia real, no remota</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-verde-fresco mt-0.5">✓</span>
                <span>Respuesta en menos de 1 hora, 7 días a la semana</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-verde-fresco mt-0.5">✓</span>
                <span>Español e inglés — sin barreras</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-verde-fresco mt-0.5">✓</span>
                <span>Recomendaciones locales que no están en TripAdvisor</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-verde-fresco mt-0.5">✓</span>
                <span>Mascotas bienvenidas — tenemos 2 perros</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
