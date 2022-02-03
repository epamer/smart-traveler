import React from 'react'
import { Container, Heading } from '@chakra-ui/react'
import type { FC } from 'react'
import { useWishlist } from '../hooks/useWishlist'

export const WishList: FC = () => {
  const cities = useWishlist()

  return (
    <>
      <Heading as="h1" my="5">
        Wishlist
      </Heading>
      <Container justifyContent="center" maxW="container.md" flexDir="row">
        <ul style={{ listStyle: 'none' }}>
          {cities.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </Container>
    </>
  )
}
