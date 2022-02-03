import { act, renderHook } from '@testing-library/react-hooks'
import { useVisited } from '../hooks/useVisited'
import { StateContextWrapper } from '../test-utils'
import { useContext } from 'react'
import { StateContext } from '../context'
import { citiesValidResponse } from '../__mocks__/citiesResponse'
import { fetchCitiesAction, updateCityAction } from '../reducers/citiesActionUtils'

describe('useVisited hook', () => {
  it('should return default value from state', () => {
    const { result } = renderHook(() => useVisited(), {
      wrapper: StateContextWrapper,
    })
    expect(result.current).toEqual([])
  })

  it('should return updated value', () => {
    const { result } = renderHook(() => ({ state: useVisited(), dispatch: useContext(StateContext).dispatch }), {
      wrapper: StateContextWrapper,
    })
    const cities = citiesValidResponse.map(city => ({ ...city, visited: true }))

    // fetch cities (all cities are visited)
    act(() => {
      fetchCitiesAction(cities)(result.current.dispatch)
    })

    expect(result.current.state).toHaveLength(3)
    expect(result.current.state).toEqual(cities)

    // make city not visited
    act(() => {
      const city = {
        ...cities[0],
        visited: false,
      }
      updateCityAction(city)(result.current.dispatch)
    })
    const notVisited = cities.slice(1) // since cities[0] became visited
    expect(result.current.state).toHaveLength(2)
    expect(result.current.state).toEqual(notVisited)

    // make city visited
    act(() => {
      const city = {
        ...cities[0],
        visited: true,
      }
      updateCityAction(city)(result.current.dispatch)
    })

    expect(result.current.state).toHaveLength(3)
    expect(result.current.state).toEqual([...notVisited, cities[0]])
  })
})
