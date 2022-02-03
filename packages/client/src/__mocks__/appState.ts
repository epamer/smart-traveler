import type { AppState } from '../reducers/appReducer'

export const appState: AppState = {
  citiesState: {
    cities: {
      citiesById: {
        0: {
          id: 0,
          name: 'Riga',
          country: 'Latvia',
          visited: false,
          wishlist: false,
        },
      },
      allIds: [0],
    },
    visitedIds: [],
    wishlistIds: [],
  },
  viewCity: 0,
}
