import React, { useEffect, useReducer } from 'react'
import type { FC } from 'react'
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { TopBar } from './components/TopBar'
import { Home } from './pages/Home'
import { WishList } from './pages/WishList'
import { Visited } from './pages/Visited'
import { getCitiesAPI } from './api'
import { fetchCitiesAction } from './reducers/citiesActionUtils'
import { StateContext } from './context'
import { appReducer } from './reducers/appReducer'
import { initialCitiesState } from './reducers/citiesReducer'
import { initialViewCityState } from './reducers/viewCityReducer'

const fonts = {
  heading:
    '"Museo Sans", museo-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Lato", lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  // chakra default
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

export const App: FC = () => {
  const [state, dispatch] = useReducer(appReducer, {
    citiesState: initialCitiesState,
    viewCity: initialViewCityState,
  })

  async function fetchCities() {
    const cities = await getCitiesAPI()
    if (cities) {
      fetchCitiesAction(cities)(dispatch)
    } else {
      // handle an error here
    }
  }

  useEffect(() => {
    fetchCities()
  }, [])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ChakraProvider theme={extendTheme({ fonts })}>
        <TopBar />
        <Box textAlign="center">
          <Routes>
            <Route index element={<Home />} />
            <Route path="wish-list" element={<WishList />} />
            <Route path="visited" element={<Visited />} />
          </Routes>
        </Box>
      </ChakraProvider>
    </StateContext.Provider>
  )
}
