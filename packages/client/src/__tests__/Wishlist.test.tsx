import { render, screen } from '@testing-library/react'
import { WishList } from '../pages/WishList'
import { useWishlist } from '../hooks/useWishlist'
import { citiesValidResponse } from '../__mocks__/citiesResponse'

jest.mock('../hooks/useWishlist')

const mockUseWishlist = useWishlist as jest.Mock

describe('<WishList />', () => {
  it('should be rendered', () => {
    mockUseWishlist.mockImplementation(() => citiesValidResponse)
    render(<WishList />)

    expect(mockUseWishlist).toHaveBeenCalledTimes(1)
    expect(screen.getByText(/Wishlist/)).toBeInTheDocument()
    expect(screen.getByText(/rome/i)).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})
