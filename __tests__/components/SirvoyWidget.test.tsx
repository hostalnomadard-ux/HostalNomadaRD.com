import { render, screen } from '@testing-library/react'
import { SirvoyWidget } from '@/components/SirvoyWidget'

describe('SirvoyWidget', () => {
  it('renders the widget container when engineId provided', () => {
    render(<SirvoyWidget engineId="test-id" />)
    expect(screen.getByTestId('sirvoy-widget-container')).toBeInTheDocument()
  })

  it('renders fallback link when no engineId', () => {
    render(<SirvoyWidget engineId="" />)
    expect(screen.getByText(/sirvoy/i)).toBeInTheDocument()
  })
})
