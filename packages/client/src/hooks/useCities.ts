import { useContext } from 'react'
import { StateContext } from '../context'

import type { Dispatch } from 'react'
import type { CitiesState } from '../reducers/citiesReducer'
import type { AppAction } from '../reducers/appReducer'

export function useCities(): [CitiesState, Dispatch<AppAction>] {
  const { state, dispatch } = useContext(StateContext)
  return [state.citiesState, dispatch]
}
