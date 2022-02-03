import { ViewCityActionTypes } from './viewCityReducer'
import type { ViewCityState } from './viewCityReducer'
import type { Dispatch } from 'react'
import type { AppAction } from './appReducer'

export function setViewCityAction(id: ViewCityState) {
  return (dispatch: Dispatch<AppAction>): void => {
    dispatch({
      type: ViewCityActionTypes.SET_VIEW_CITY,
      payload: id,
    })
  }
}
