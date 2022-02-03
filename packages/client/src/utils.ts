import type { Cities, City } from './reducers/citiesReducer'

export function getSuggestions(cities: City[], query: string): City[] {
  const regex = new RegExp(`^${query}`, 'i')
  return cities.filter(city => {
    return regex.test(city.name) && city
  })
}

export function getCityIdByName(value: string, cities: Cities): number {
  return cities.allIds.find(id => cities.citiesById[id].name === value) as number
}
