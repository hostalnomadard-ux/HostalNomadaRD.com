'use client'

import { useState } from 'react'

type FAQItem = { pregunta: string; respuesta: string }

export default function FaqAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-verde-fresco font-semibold text-sm uppercase tracking-wider mb-3">
          Preguntas frecuentes
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-carbon mb-10">Lo que más preguntan</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.pregunta} className="rounded-xl border border-gray-100 bg-white overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-carbon hover:bg-gray-50 transition-colors duration-150"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span>{faq.pregunta}</span>
                <span className={`ml-4 shrink-0 text-verde-fresco transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div id={`faq-panel-${i}`} className="px-6 pb-5 text-carbon/70 text-sm leading-relaxed border-t border-gray-50">
                  <p className="pt-4">{faq.respuesta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
