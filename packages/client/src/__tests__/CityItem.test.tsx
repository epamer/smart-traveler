import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CityItem } from '../components/CityItem'
import { cityValidResponse } from '../__mocks__/cityResponse'

describe('<CityItem /> component', () => {
  const updateCallback = jest.fn()

  it('should be rendered', () => {
    render(<CityItem city={cityValidResponse} updateCityCallback={updateCallback} />)
    expect(screen.getByText(/riga/i)).toBeInTheDocument()
    expect(screen.getByText(/latvia/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /visited/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /wishlist/i })).toBeInTheDocument()
  })

  describe('events', () => {
    it('visited onChange ', () => {
      render(<CityItem city={cityValidResponse} updateCityCallback={updateCallback} />)
      const checkbox = screen.getByRole('checkbox', { name: /visited/i })
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    it(' wishlist onChange ', () => {
      render(<CityItem city={cityValidResponse} updateCityCallback={updateCallback} />)
      const checkbox = screen.getByRole('checkbox', { name: /wishlist/i })
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })
  })
})
