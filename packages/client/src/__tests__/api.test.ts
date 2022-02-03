import { citiesInvalidResponse, citiesValidResponse } from '../__mocks__/citiesResponse'
import { getCitiesAPI, getCityAPI, updateCityAPI } from '../api'
import { cityInvalidResponse, cityValidResponse } from '../__mocks__/cityResponse'

describe('api', () => {
  describe('getCities', () => {
    const successResponse = {
      json: () =>
        Promise.resolve({
          cities: citiesValidResponse,
        }),
    }

    const failResponse = {
      json: () =>
        Promise.resolve({
          cities: citiesInvalidResponse,
        }),
    }

    it('should return a promise with data if request success', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce(successResponse) as jest.MockedFunction<typeof global.fetch>
      const cities = await getCitiesAPI()
      expect(cities).toEqual(citiesValidResponse)
    })

    it('should return a promise with undefined if request failed', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce(failResponse) as jest.MockedFunction<typeof global.fetch>
      const cities = await getCitiesAPI()
      expect(cities).toBeUndefined()
    })

    it('should return undefined if an error occurred', async () => {
      global.fetch = jest.fn().mockRejectedValueOnce('Ops, something went wrong..')
      global.console.error = jest.fn()

      const cities = await getCitiesAPI()
      expect(cities).toBeUndefined()
      expect(global.console.error).toHaveBeenCalledWith('Ops, something went wrong..')
    })
  })

  describe('GET/PUT cities/:id', () => {
    const successResponse = {
      status: 200,
      json: () => Promise.resolve(cityValidResponse),
    }

    const failResponse = {
      status: 404,
      json: () => Promise.resolve(cityInvalidResponse),
    }

    describe('getCityAPI', () => {
      it('should return city if request success', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce(successResponse) as jest.MockedFunction<typeof global.fetch>
        const city = await getCityAPI(0)
        expect(city).toEqual(cityValidResponse)
      })

      it('should return undefined if there is no city with such id', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce(failResponse) as jest.MockedFunction<typeof global.fetch>
        const city = await getCityAPI(12345)
        expect(city).toEqual(cityInvalidResponse)
      })

      it('should return undefined if an error occurred', async () => {
        global.fetch = jest.fn().mockRejectedValueOnce('Ops, something went wrong..')
        global.console.error = jest.fn()

        const cities = await getCityAPI(12345)
        expect(cities).toBeUndefined()
        expect(global.console.error).toHaveBeenCalledWith('Ops, something went wrong..')
      })
    })

    describe('updateCityAPI', () => {
      it('should call fetch with correct params', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce(successResponse) as jest.MockedFunction<typeof global.fetch>
        await updateCityAPI(cityValidResponse)

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/rest/cities/0', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(cityValidResponse),
        })
      })

      it('should update city', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce(successResponse) as jest.MockedFunction<typeof global.fetch>
        await expect(updateCityAPI(cityValidResponse)).resolves.toEqual(cityValidResponse)
      })

      it('should return undefined if there is no city with such id', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce(failResponse) as jest.MockedFunction<typeof global.fetch>
        await expect(updateCityAPI(cityValidResponse)).resolves.toEqual(cityInvalidResponse)
      })

      it('should return undefined if an error occurred', async () => {
        global.fetch = jest.fn().mockRejectedValueOnce('Ops, something went wrong..')
        global.console.error = jest.fn()

        const cities = await updateCityAPI(cityValidResponse)
        expect(cities).toBeUndefined()
        expect(global.console.error).toHaveBeenCalledWith('Ops, something went wrong..')
      })
    })
  })
})
