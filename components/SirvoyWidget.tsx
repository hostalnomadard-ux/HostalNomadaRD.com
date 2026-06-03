'use client'

import { useEffect, useRef } from 'react'

interface SirvoyWidgetProps {
  engineId: string
}

export function SirvoyWidget({ engineId }: SirvoyWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!engineId || !containerRef.current) return

    const container = containerRef.current
    container.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.id = 'sbw_widget_1'
    container.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://secured.sirvoy.com/widget/sirvoy.js'
    script.setAttribute('data-form-id', engineId)
    widgetDiv.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [engineId])

  if (!engineId) {
    return (
      <div className="text-center py-12 text-gray-500">
        Widget de reservas no configurado.{' '}
        <a
          href="https://secured.sirvoy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-nomada-green underline"
        >
          Ir a Sirvoy
        </a>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      data-testid="sirvoy-widget-container"
      className="w-full min-h-[200px]"
    />
  )
}
