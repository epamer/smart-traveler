import { citiesReducer } from './citiesReducer'
import { viewCityReducer } from './viewCityReducer'
import type { CitiesState, CitiesAction } from './citiesReducer'
import type { ViewCityState, ViewCityAction } from './viewCityReducer'

export type AppState = {
  citiesState: CitiesState
  viewCity: ViewCityState
}

export type AppAction = CitiesAction | ViewCityAction

export function appReducer(state: AppState, action: AppAction): AppState {
  return {
    citiesState: citiesReducer(state.citiesState, action as CitiesAction),
    viewCity: viewCityReducer(state.viewCity, action as ViewCityAction),
  }
}
