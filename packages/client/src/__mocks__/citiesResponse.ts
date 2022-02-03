import type { City } from '../reducers/citiesReducer'

export const citiesValidResponse: City[] = [
  {
    id: 0,
    name: 'Riga',
    country: 'Latvia',
    visited: false,
    wishlist: false,
  },
  {
    id: 1,
    name: 'Rome',
    country: 'Italy',
    visited: true,
    wishlist: false,
  },
  {
    id: 2,
    name: 'Oslo',
    country: 'Norway',
    visited: false,
    wishlist: true,
  },
]

export const citiesInvalidResponse = undefined
