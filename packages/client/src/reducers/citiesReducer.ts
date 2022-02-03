import { updateCity, normalizeStore } from './citiesReducerUtils'

export type City = {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export type Cities = {
  citiesById: {
    [key: number]: City
  }
  allIds: number[]
}

export type CitiesState = {
  cities: Cities
  visitedIds: number[]
  wishlistIds: number[]
}

export enum CitiesActionTypes {
  FETCH_CITIES = 'FETCH_CITIES',
  UPDATE_CITY = 'UPDATE_CITY',
}

export type CitiesAction =
  | { type: CitiesActionTypes.FETCH_CITIES; payload: City[] }
  | { type: CitiesActionTypes.UPDATE_CITY; payload: City }

export const initialCitiesState = {
  cities: {
    citiesById: {},
    allIds: [],
  },
  visitedIds: [],
  wishlistIds: [],
}

export function citiesReducer(state: CitiesState = initialCitiesState, action: CitiesAction): CitiesState {
  switch (action.type) {
    case CitiesActionTypes.FETCH_CITIES:
      return normalizeStore(action.payload)

    case CitiesActionTypes.UPDATE_CITY:
      return updateCity(state, action.payload)

    default:
      return state
  }
}
