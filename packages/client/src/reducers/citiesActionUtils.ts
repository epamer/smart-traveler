import { CitiesActionTypes } from './citiesReducer'
import type { Dispatch } from 'react'
import type { CitiesAction, City } from './citiesReducer'

export type ActionFunction = (dispatch: Dispatch<CitiesAction>) => void

export function fetchCitiesAction(cities: City[]): ActionFunction {
  return dispatch => {
    dispatch({
      type: CitiesActionTypes.FETCH_CITIES,
      payload: cities,
    })
  }
}

export function updateCityAction(city: City): ActionFunction {
  return dispatch => {
    dispatch({ type: CitiesActionTypes.UPDATE_CITY, payload: city })
  }
}
