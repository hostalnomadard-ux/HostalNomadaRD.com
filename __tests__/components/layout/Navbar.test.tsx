import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

describe('Navbar', () => {
  it('renders logo image', () => {
    render(<Navbar />)
    expect(screen.getByRole('img', { name: /hostal nómada/i })).toBeInTheDocument()
  })

  it('renders reservar link', () => {
    render(<Navbar />)
    const links = screen.getAllByRole('link', { name: /reservar/i })
    expect(links.length).toBeGreaterThan(0)
  })

  it('reservar link points to /reservar', () => {
    render(<Navbar />)
    const links = screen.getAllByRole('link', { name: /reservar/i })
    expect(links[0]).toHaveAttribute('href', '/reservar')
  })
})
