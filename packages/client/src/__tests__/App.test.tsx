import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen, waitFor } from '@testing-library/react'
import { render } from '../test-utils'
import { App } from '../App'
import { getCitiesAPI } from '../api'
import { fetchCitiesAction } from '../reducers/citiesActionUtils'
import { act } from 'react-dom/test-utils'
import { citiesInvalidResponse, citiesValidResponse } from '../__mocks__/citiesResponse'

jest.mock('../api')
jest.mock('../reducers/citiesActionUtils')

const getCitiesAPIMock = getCitiesAPI as jest.MockedFunction<typeof getCitiesAPI>
const fetchCitiesActionMock = fetchCitiesAction as jest.MockedFunction<typeof fetchCitiesAction>

describe('<App /> component', () => {
  it('renders the Header content', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
    })
    expect(screen.getByText(/^Smart traveller$/i)).toBeInTheDocument()
  })

  describe('fetch cities', () => {
    it('should call getCities once', async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
        )
      })
      expect(getCitiesAPIMock).toHaveBeenCalledTimes(1)
    })

    it('should call fetchCitiesAction once getCitiesAPI returned data', async () => {
      getCitiesAPIMock.mockResolvedValue(citiesValidResponse)
      fetchCitiesActionMock.mockImplementationOnce(() => jest.fn)

      await act(async () => {
        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
        )
      })
      expect(fetchCitiesActionMock).toHaveBeenCalledTimes(1)
      expect(fetchCitiesActionMock).toHaveBeenCalledWith(citiesValidResponse)
    })

    it('should do nothing once getCitiesAPI returned undefined', async () => {
      getCitiesAPIMock.mockResolvedValue(citiesInvalidResponse)

      await act(async () => {
        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
        )
      })
      await waitFor(() => {
        expect(fetchCitiesActionMock).toHaveBeenCalledTimes(0)
      })
    })
  })
})
