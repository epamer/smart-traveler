import type { City } from './reducers/citiesReducer'

const baseUrl = 'http://localhost:4000'

export async function getCitiesAPI(): Promise<City[] | undefined> {
  try {
    const response = await fetch(`${baseUrl}/rest/cities`)
    const { cities } = await response.json()
    return cities
  } catch (e) {
    console.error(e)
  }
}

export async function getCityAPI(id: number): Promise<City | undefined> {
  try {
    const response = await fetch(`${baseUrl}/rest/cities/${id}`)
    return await handleResponse(response)
  } catch (e) {
    console.error(e)
  }
}

export async function updateCityAPI(city: City | Partial<City>): Promise<City | undefined> {
  try {
    const response = await fetch(`${baseUrl}/rest/cities/${city.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(city),
    })
    return await handleResponse(response)
  } catch (e) {
    console.error(e)
  }
}

async function handleResponse(response: Response): Promise<City | undefined> {
  switch (response.status) {
    case 200:
      return await response.json()
    case 404:
    default:
      return
  }
}
