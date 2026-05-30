import { render, screen } from '@testing-library/react'
import { RoomCard } from '@/components/rooms/RoomCard'

const mockRoom = {
  id: 'valle',
  name: 'Cuarto Valle',
  type: 'Privado' as const,
  description: 'Cuarto colonial con cama matrimonial.',
  capacity: 2,
  beds: 1,
  bath: 'Privado',
  amenities: ['AC', 'WiFi'],
  priceFrom: 'Desde DOP 2,400',
}

describe('RoomCard', () => {
  it('renders room name', () => {
    render(<RoomCard room={mockRoom} />)
    expect(screen.getByText('Cuarto Valle')).toBeInTheDocument()
  })

  it('renders price', () => {
    render(<RoomCard room={mockRoom} />)
    expect(screen.getByText('Desde DOP 2,400')).toBeInTheDocument()
  })

  it('renders reservar button linking to /reservar', () => {
    render(<RoomCard room={mockRoom} />)
    const link = screen.getByRole('link', { name: /reservar/i })
    expect(link).toHaveAttribute('href', '/reservar')
  })
})
