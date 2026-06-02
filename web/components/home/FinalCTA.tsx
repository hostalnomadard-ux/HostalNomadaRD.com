'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.2 }
    )
    if (leftRef.current) observer.observe(leftRef.current)
    if (rightRef.current) observer.observe(rightRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">

      {/* Hostal — Verde */}
      <div ref={leftRef} className="cta-panel-left bg-verde-fresco px-8 py-16 flex flex-col items-center text-center gap-6">
        <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
          Hostal Nómada
        </p>
        <h3 className="text-3xl font-bold text-white leading-tight">
          Reserva tu cuarto.
          <span className="block text-white/80 font-normal text-xl mt-1">
            Cama full · Baño privado · Smart Lock.
          </span>
        </h3>
        <Button variant="outline-white" size="lg" href="/reservar">
          Ver disponibilidad →
        </Button>
      </div>

      {/* Cervecería — Azul */}
      <div ref={rightRef} className="cta-panel-right bg-royal-blue px-8 py-16 flex flex-col items-center text-center gap-6">
        <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
          Cervecería Búcaro
        </p>
        <h3 className="text-3xl font-bold text-white leading-tight">
          Tómate una.
          <span className="block text-white/80 font-normal text-xl mt-1">
            En el mismo edificio.
          </span>
        </h3>
        <Button variant="outline-white" size="lg" href="/cerveceria">
          Conoce Búcaro →
        </Button>
      </div>

    </section>
  )
}
