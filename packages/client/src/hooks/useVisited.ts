import { StateContext } from '../context'
import { useContext } from 'react'
import type { City } from '../reducers/citiesReducer'

export function useVisited(): City[] {
  const { state } = useContext(StateContext)
  const { citiesState } = state
  return citiesState.visitedIds.map(id => citiesState.cities.citiesById[id])
}
