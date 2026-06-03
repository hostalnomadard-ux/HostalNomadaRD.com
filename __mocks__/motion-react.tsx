import React from 'react'

type AnyProps = Record<string, unknown>

const MOTION_PROPS = new Set([
  'initial', 'animate', 'exit', 'whileInView', 'whileHover', 'whileTap',
  'viewport', 'transition', 'variants', 'custom', 'layout', 'layoutId',
])

function makeElement(tag: string) {
  const Component = React.forwardRef<HTMLElement, AnyProps>(
    (props, ref) => {
      const htmlProps: AnyProps = { ref }
      for (const key of Object.keys(props)) {
        if (!MOTION_PROPS.has(key)) htmlProps[key] = props[key]
      }
      return React.createElement(tag, htmlProps)
    }
  )
  Component.displayName = `motion.${tag}`
  return Component
}

export const motion = new Proxy({} as Record<string, ReturnType<typeof makeElement>>, {
  get: (_, tag: string) => makeElement(tag),
})

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>
