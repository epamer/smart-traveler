import type { City } from '../reducers/citiesReducer'

export const cityValidResponse: City = {
  id: 0,
  name: 'Riga',
  country: 'Latvia',
  visited: false,
  wishlist: false,
}

export const cityInvalidResponse = undefined
