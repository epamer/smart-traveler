import { citiesValidResponse } from '../__mocks__/citiesResponse'
import { normalizeStore, updateCity } from '../reducers/citiesReducerUtils'
import { appState } from '../__mocks__/appState'

describe('citiesReducerUtils', () => {
  it('should normalize store', () => {
    const store = normalizeStore(citiesValidResponse)

    expect(store.cities.citiesById).toBeDefined()
    expect(store.cities.allIds).toBeDefined()
    expect(store.visitedIds).toBeDefined()
    expect(store.wishlistIds).toBeDefined()
    expect(store.cities.allIds.length).toBe(3)
    citiesValidResponse.forEach((city, i) => {
      expect(store.cities.citiesById[i]).toEqual(city)
    })
    expect(store.visitedIds.length).toBe(1)
    expect(store.visitedIds[0]).toBe(1)

    expect(store.wishlistIds.length).toBe(1)
    expect(store.wishlistIds[0]).toBe(2)
  })

  describe('updateCity', () => {
    describe('update visited property', () => {
      it('should update city item and  add city to visitedIds if visited true', () => {
        const state = appState.citiesState
        const city = {
          ...state.cities.citiesById[0],
          visited: true,
        }
        expect(state.visitedIds).toHaveLength(0)
        const updatedState = updateCity(state, city)
        expect(updatedState.cities.citiesById[0]).toEqual(city)
        expect(updatedState.visitedIds).toHaveLength(1)
      })

      it('should update city item and remove city from visitedIds if visited false', () => {
        const state = appState.citiesState
        const city = { ...state.cities.citiesById[0] }
        state.cities.citiesById[0].visited = true
        state.visitedIds.push(0)

        expect(state.visitedIds).toHaveLength(1)
        const updatedState = updateCity(state, city)
        expect(updatedState.cities.citiesById[0]).toEqual(city)
        expect(updatedState.visitedIds).toHaveLength(0)
      })
    })
  })

  describe('update wishlist property', () => {
    it('should update city item and  add city to wishlistIds if wishlist true', () => {
      const state = appState.citiesState
      const city = {
        ...state.cities.citiesById[0],
        wishlist: true,
      }
      expect(state.wishlistIds).toHaveLength(0)
      const updatedState = updateCity(state, city)
      expect(updatedState.cities.citiesById[0]).toEqual(city)
      expect(updatedState.wishlistIds).toHaveLength(1)
    })

    it('should update city item and remove city from wishlistIds if wishlist false', () => {
      const state = appState.citiesState
      const city = { ...state.cities.citiesById[0] }
      state.cities.citiesById[0].wishlist = true
      state.wishlistIds.push(0)

      expect(state.wishlistIds).toHaveLength(1)
      const updatedState = updateCity(state, city)
      expect(updatedState.cities.citiesById[0]).toEqual(city)
      expect(updatedState.wishlistIds).toHaveLength(0)
    })
  })
})
