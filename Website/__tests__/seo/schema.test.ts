import { lodgingSchema } from '@/lib/seo'

describe('LodgingBusiness schema', () => {
  it('has correct @type', () => {
    expect(lodgingSchema['@type']).toBe('LodgingBusiness')
  })

  it('has correct name', () => {
    expect(lodgingSchema.name).toBe('Hostal Nómada')
  })

  it('has address with correct city', () => {
    expect(lodgingSchema.address.addressLocality).toBe('Santiago de los Caballeros')
  })

  it('has geo coordinates', () => {
    expect(lodgingSchema.geo.latitude).toBe('19.4521542')
    expect(lodgingSchema.geo.longitude).toBe('-70.7066258')
  })
})
