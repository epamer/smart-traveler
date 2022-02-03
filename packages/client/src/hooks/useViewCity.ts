import { useContext } from 'react'
import { StateContext } from '../context'
import type { City } from '../reducers/citiesReducer'

export function useViewCity(): City | null {
  const { state } = useContext(StateContext)
  return state.viewCity ? state.citiesState.cities.citiesById[state.viewCity] : null
}
