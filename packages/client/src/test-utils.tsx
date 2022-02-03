import * as React from 'react'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { useReducer } from 'react'
import type { ReactNode } from 'react'
import { appReducer } from './reducers/appReducer'
import { initialCitiesState } from './reducers/citiesReducer'
import { initialViewCityState } from './reducers/viewCityReducer'
import { StateContext } from './context'

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }

export const StateContextWrapper = ({ children }: { children?: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, {
    citiesState: initialCitiesState,
    viewCity: initialViewCityState,
  })

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}
