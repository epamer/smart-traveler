import { useState } from 'react'
import { Box, FormLabel, Stack, Switch } from '@chakra-ui/react'

import type { FC } from 'react'
import type { City } from '../reducers/citiesReducer'

export const CityItem: FC<{ city: City; updateCityCallback: (city: City) => void }> = ({
  city,
  updateCityCallback,
}) => {
  const { name, country, visited, wishlist } = city

  const [isVisited, setIsVisited] = useState(visited)
  const [isWishlist, setIsWishlist] = useState(wishlist)

  const onVisitedHandler = () => {
    setIsVisited(prev => {
      updateCityCallback({ ...city, visited: !prev, wishlist: isWishlist })
      return !prev
    })
  }

  const onWishlistHandler = () => {
    setIsWishlist(prev => {
      updateCityCallback({ ...city, visited: isVisited, wishlist: !prev })
      return !prev
    })
  }

  return (
    <Box my="6">
      <Box data-testid="cityItem" p="3" borderRadius="5">
        <Box display="flex" alignItems="baseline" justifyContent="space-between">
          <Box fontSize="24">{name}</Box>
          <Box mx="2">{country}</Box>

          <Stack align="center" direction="row" alignContent="center">
            <FormLabel htmlFor="visited" mb="0">
              Visited:
            </FormLabel>
            <Switch id="visited" isChecked={isVisited} onChange={onVisitedHandler} />

            <FormLabel htmlFor="wishlist" mb="0">
              Wishlist:
            </FormLabel>
            <Switch id="wishlist" isChecked={isWishlist} onChange={onWishlistHandler} />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
