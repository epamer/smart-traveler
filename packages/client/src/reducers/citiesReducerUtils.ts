import type { CitiesState, City } from './citiesReducer'

function addItem(id: number, list: number[]): number[] {
  return list.includes(id) ? [...list] : [...list, id]
}

function removeItem(id: number, list: number[]): number[] {
  return list.filter(item => item !== id)
}

const init: CitiesState = {
  cities: {
    citiesById: {},
    allIds: [],
  },
  visitedIds: [],
  wishlistIds: [],
}

export function normalizeStore(cities: City[]): CitiesState {
  return cities.reduce((acc, city): CitiesState => {
    acc.cities.citiesById[city.id] = city
    acc.cities.allIds.push(city.id)
    if (city.visited) {
      acc.visitedIds.push(city.id)
    }
    if (city.wishlist) {
      acc.wishlistIds.push(city.id)
    }
    return acc
  }, init)
}

export function updateCity(state: CitiesState, city: City): CitiesState {
  return {
    cities: {
      ...state.cities,
      citiesById: {
        ...state.cities.citiesById,
        [city.id]: {
          ...city,
        },
      },
    },
    visitedIds: city.visited ? addItem(city.id, state.visitedIds) : removeItem(city.id, state.visitedIds),
    wishlistIds: city.wishlist ? addItem(city.id, state.wishlistIds) : removeItem(city.id, state.wishlistIds),
  }
}
