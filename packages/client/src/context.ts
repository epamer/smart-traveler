import React from 'react'
import type { Dispatch } from 'react'
import type { AppState, AppAction } from './reducers/appReducer'
import { initialCitiesState } from './reducers/citiesReducer'
import { initialViewCityState } from './reducers/viewCityReducer'

export type GlobalState = {
  state: AppState
  dispatch: Dispatch<AppAction>
}

export const StateContext = React.createContext<GlobalState>({
  state: {
    citiesState: initialCitiesState,
    viewCity: initialViewCityState,
  },
  dispatch: () => {
    // do nothing
  },
})
