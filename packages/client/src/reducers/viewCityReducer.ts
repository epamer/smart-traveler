export type ViewCityState = number | null

export enum ViewCityActionTypes {
  SET_VIEW_CITY = 'SET_VIEW_CITY',
}

export type ViewCityAction = {
  type: ViewCityActionTypes
  payload: ViewCityState
}

export const initialViewCityState = null

export const viewCityReducer = (state: ViewCityState = initialViewCityState, action: ViewCityAction): ViewCityState => {
  switch (action.type) {
    case ViewCityActionTypes.SET_VIEW_CITY:
      return action.payload
    default:
      return state
  }
}
