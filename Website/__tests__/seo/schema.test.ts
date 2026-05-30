import { lodgingSchema } from '@/lib/seo'

describe('LodgingBusiness schema', () => {
  it('has correct @type array including Hostel', () => {
    expect(lodgingSchema['@type']).toEqual(['LodgingBusiness', 'Hostel'])
  })

  it('has correct name', () => {
    expect(lodgingSchema.name).toBe('Hostal Nómada')
  })

  it('has correct real telephone number', () => {
    expect(lodgingSchema.telephone).toBe('+18297557202')
  })

  it('has canonical street address', () => {
    expect(lodgingSchema.address.streetAddress).toBe(
      'C/ Benito Monción 29, esq. Máximo Gómez 34'
    )
  })

  it('has correct city', () => {
    expect(lodgingSchema.address.addressLocality).toBe('Santiago de los Caballeros')
  })

  it('has postal code', () => {
    expect(lodgingSchema.address.postalCode).toBe('51000')
  })

  it('has geo coordinates', () => {
    expect(lodgingSchema.geo.latitude).toBe('19.4521542')
    expect(lodgingSchema.geo.longitude).toBe('-70.7066258')
  })

  it('has ISO 8601 checkinTime', () => {
    expect(lodgingSchema.checkinTime).toBe('T15:00')
  })

  it('has ISO 8601 checkoutTime', () => {
    expect(lodgingSchema.checkoutTime).toBe('T11:00')
  })

  it('has real reviewCount matching page display', () => {
    expect(lodgingSchema.aggregateRating.reviewCount).toBe('457')
  })

  it('has worstRating for complete AggregateRating', () => {
    expect(lodgingSchema.aggregateRating.worstRating).toBe('1')
  })

  it('has image property required for Google rich results', () => {
    expect(Array.isArray(lodgingSchema.image)).toBe(true)
    expect(lodgingSchema.image[0]).toContain('fachada')
  })

  it('has Art Déco description, not colonial', () => {
    expect(lodgingSchema.description).toContain('Art Déco')
    expect(lodgingSchema.description).not.toContain('colonial')
  })

  it('has priceRange', () => {
    expect(lodgingSchema.priceRange).toBeDefined()
  })
})
