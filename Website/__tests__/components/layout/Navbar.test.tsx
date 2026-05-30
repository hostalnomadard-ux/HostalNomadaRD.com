import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

describe('Navbar', () => {
  it('renders logo text', () => {
    render(<Navbar />)
    expect(screen.getByText(/nómada/i)).toBeInTheDocument()
  })

  it('renders reservar link', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /reservar/i })).toBeInTheDocument()
  })

  it('reservar link points to /reservar', () => {
    render(<Navbar />)
    const link = screen.getByRole('link', { name: /reservar/i })
    expect(link).toHaveAttribute('href', '/reservar')
  })
})
