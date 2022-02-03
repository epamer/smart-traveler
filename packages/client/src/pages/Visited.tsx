import React from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { useVisited } from '../hooks/useVisited'
import type { FC } from 'react'

export const Visited: FC = () => {
  const cities = useVisited()

  return (
    <>
      <Heading as="h1" my="5">
        Visited
      </Heading>
      <Container justifyContent="center" maxW="container.md" flexDir="row">
        <ul style={{ listStyle: 'none' }}>
          {cities.map(city => (
            <li key={city.id}>{city.name}</li>
          ))}
        </ul>
      </Container>
    </>
  )
}
