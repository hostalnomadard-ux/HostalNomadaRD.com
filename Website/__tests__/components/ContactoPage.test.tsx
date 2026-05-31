import { render, screen } from '@testing-library/react'
import ContactoPage from '@/app/contacto/page'

describe('ContactoPage', () => {
  it('WhatsApp button links to real number 18297557202', () => {
    render(<ContactoPage />)
    const btn = screen.getByText('Escribir por WhatsApp')
    expect(btn.closest('a')).toHaveAttribute('href', 'https://wa.me/18297557202')
  })

  it('displays canonical address', () => {
    render(<ContactoPage />)
    expect(screen.getByText(/Benito Monción 29/)).toBeInTheDocument()
  })

  it('WhatsApp link has noopener noreferrer rel for security', () => {
    render(<ContactoPage />)
    const link = screen.getByText('Escribir por WhatsApp').closest('a')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
