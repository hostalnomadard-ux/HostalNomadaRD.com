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

    // Remove any pre-existing script + widget
    document.querySelector('script[data-form-id]')?.remove()
    document.getElementById('sbw_widget_1')?.remove()

    // Observe body for the sbw_widget_* div Sirvoy injects
    const observer = new MutationObserver(() => {
      const sbw = document.querySelector('[id^="sbw_widget_"]') as HTMLElement | null
      if (sbw && sbw.parentElement !== container) {
        container.appendChild(sbw)
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true, subtree: false })

    // Inject the Sirvoy script
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-form-id', engineId)
    script.src = 'https://secured.sirvoy.com/widget/sirvoy.js'
    document.body.appendChild(script)

    return () => {
      observer.disconnect()
      document.querySelector('script[data-form-id]')?.remove()
      document.getElementById('sbw_widget_1')?.remove()
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
      className="w-full min-h-[580px]"
    />
  )
}
