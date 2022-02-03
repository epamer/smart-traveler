import { StateContext } from '../context'
import { useContext } from 'react'
import type { City } from '../reducers/citiesReducer'

export function useWishlist(): City[] {
  const { state } = useContext(StateContext)
  const { citiesState } = state
  return citiesState.wishlistIds.map(id => citiesState.cities.citiesById[id])
}
