import { fetchCitiesAction, updateCityAction } from '../reducers/citiesActionUtils'
import { citiesValidResponse } from '../__mocks__/citiesResponse'
import { cityValidResponse } from '../__mocks__/cityResponse'

describe('citiesActionUtils', () => {
  describe('fetchCitiesAction', () => {
    it('should call dispatch with correct data', function () {
      const action = fetchCitiesAction(citiesValidResponse)
      const dispatch = jest.fn() as jest.Mock
      action(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'FETCH_CITIES',
        payload: citiesValidResponse,
      })
    })
  })

  describe('updateCityAction', () => {
    it('should call dispatch with correct data', function () {
      const action = updateCityAction(cityValidResponse)
      const dispatch = jest.fn() as jest.Mock
      action(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_CITY',
        payload: cityValidResponse,
      })
    })
  })
})
