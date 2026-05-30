export const lodgingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Hostal Nómada',
  description:
    'Hostal boutique en edificio colonial de más de 75 años en el centro histórico de Santiago de los Caballeros, República Dominicana.',
  url: 'https://hostalnomadard.com',
  telephone: '+18091234567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '#43 C. Máximo Gómez',
    addressLocality: 'Santiago de los Caballeros',
    addressRegion: 'Santiago',
    addressCountry: 'DO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '19.4521542',
    longitude: '-70.7066258',
  },
  checkinTime: '15:00',
  checkoutTime: '11:00',
  petsAllowed: true,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.64',
    reviewCount: '11',
    bestRating: '5',
  },
}
