import { render, screen } from '@testing-library/react'
import { Reviews } from '@/components/home/Reviews'

describe('Reviews', () => {
  it('renders all 4 reviews', () => {
    render(<Reviews />)
    expect(screen.getByText(/Landon/i)).toBeInTheDocument()
    expect(screen.getByText(/Ólfir/i)).toBeInTheDocument()
    expect(screen.getByText(/Harold/i)).toBeInTheDocument()
    expect(screen.getByText(/Leny/i)).toBeInTheDocument()
  })

  it('renders star ratings', () => {
    render(<Reviews />)
    const stars = screen.getAllByLabelText('estrella')
    expect(stars.length).toBeGreaterThan(0)
  })
})
