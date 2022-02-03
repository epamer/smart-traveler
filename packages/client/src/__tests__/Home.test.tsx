import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from '../pages/Home'
import userEvent from '@testing-library/user-event'
import { StateContext } from '../context'
import { appState } from '../__mocks__/appState'
import type { AppAction } from '../reducers/appReducer'
import type { Dispatch } from 'react'

describe('<Home /> component', () => {
  describe('render', () => {
    it('input field', () => {
      render(<Home />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('search button disabled', () => {
      render(<Home />)
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByLabelText('search')).toBeDisabled()
    })
  })

  describe('events', () => {
    describe('input change', () => {
      beforeEach(() => {
        render(
          <StateContext.Provider value={{ state: appState, dispatch: jest.fn() }}>
            <Home />
          </StateContext.Provider>
        )
      })

      it('should keep search button disabled', () => {
        const input = screen.getByRole('textbox')
        const button = screen.getByLabelText('search')
        userEvent.type(input, 'bannan')
        expect(button).toBeDisabled()
      })

      it(' should show suggestions based on input value', async () => {
        const input = screen.getByRole('textbox')
        userEvent.type(input, 'ri')

        expect(screen.getByTestId('suggestions')).toBeInTheDocument()
        expect(await screen.findByText(/Riga/)).toBeInTheDocument()
      })

      it(' should hide suggestions when a suggestion has been clicked', async () => {
        userEvent.type(screen.getByRole('textbox'), 'ri')
        const suggestions = screen.getByTestId('suggestions')

        expect(suggestions).toBeInTheDocument()

        userEvent.click(await screen.findByText(/Riga/))
        expect(suggestions).not.toBeInTheDocument()
      })

      it(' should enable search btn if a use clicked a suggestion', async () => {
        const input = screen.getByRole('textbox')
        const button = screen.getByLabelText('search')
        userEvent.type(input, 'ri')

        const suggestion = await screen.findByText(/Riga/)
        expect(button).toBeDisabled()
        userEvent.click(suggestion)

        expect(input).toHaveValue('Riga')
        expect(button).toBeEnabled()
      })
    })

    describe('click search bnt', () => {
      let dispatch: Dispatch<AppAction>

      beforeEach(() => {
        dispatch = jest.fn()

        render(
          <StateContext.Provider value={{ state: appState, dispatch }}>
            <Home />
          </StateContext.Provider>
        )
      })

      it('should clear input when search button clicked', async () => {
        const input = screen.getByRole('textbox')
        const button = screen.getByLabelText('search')
        userEvent.type(input, 'ri')

        userEvent.click(await screen.findByText(/Riga/))
        userEvent.click(button)
        expect(input).toHaveValue('')
      })

      it('should show city item', async () => {
        const input = screen.getByRole('textbox')
        const button = screen.getByLabelText('search')
        userEvent.type(input, 'ri')
        userEvent.click(await screen.findByText(/Riga/))
        userEvent.click(button)
        expect(dispatch).toHaveBeenCalledWith({ type: 'SET_VIEW_CITY', payload: 0 })
      })
    })
  })
})
