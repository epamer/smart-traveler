import type { FC } from 'react'
import React, { useEffect, useState, useRef } from 'react'
import { getSuggestions } from '../utils'
import type { Cities, City } from '../reducers/citiesReducer'
import { List, ListItem } from '@chakra-ui/react'

type SuggestionsComponent = FC<{ query: string; cities: Cities; callback: (id: number) => void }>

export const Suggestions: SuggestionsComponent = ({ query, cities, callback }) => {
  const cityList = useRef<City[]>([])
  const [suggestions, setSuggestions] = useState<City[]>([])

  useEffect(() => {
    cityList.current = cities.allIds.map(id => cities.citiesById[id])
  }, [])

  useEffect(() => {
    const suggestions = !query ? [] : getSuggestions(cityList.current, query)
    setSuggestions(suggestions)
  }, [query])

  const onClickHandler = (id: number): void => {
    callback(id)
    setSuggestions([])
  }

  return (
    <List color="#afafaf" data-testid="suggestions">
      {suggestions.map(city => {
        return (
          <ListItem _hover={{ color: '#fff', cursor: 'pointer' }} key={city.id} onClick={() => onClickHandler(city.id)}>
            {city.name} <small>{city.country}</small>
          </ListItem>
        )
      })}
    </List>
  )
}
