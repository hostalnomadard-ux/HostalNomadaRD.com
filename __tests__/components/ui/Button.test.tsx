import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Reservar</Button>)
    expect(screen.getByText('Reservar')).toBeInTheDocument()
  })

  it('renders as a button element by default', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies outline variant', () => {
    render(<Button variant="outline">Click</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
    // Verify outline classes are applied (border class)
    expect(btn.className).toContain('border')
  })

  it('renders as a link when href is provided', () => {
    render(<Button href="/reservar">Reservar</Button>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/reservar')
  })
})
