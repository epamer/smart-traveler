import { render, screen } from '@testing-library/react'
import { Visited } from '../pages/Visited'
import { useVisited } from '../hooks/useVisited'
import { citiesValidResponse } from '../__mocks__/citiesResponse'

jest.mock('../hooks/useVisited')

const mockUseVisited = useVisited as jest.Mock

describe('<Visited />', () => {
  it('should be rendered', () => {
    mockUseVisited.mockImplementation(() => citiesValidResponse)
    render(<Visited />)

    expect(mockUseVisited).toHaveBeenCalledTimes(1)
    expect(screen.getByText(/Visited/)).toBeInTheDocument()
    expect(screen.getByText(/rome/i)).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})
