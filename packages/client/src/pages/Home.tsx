import React, { useState } from 'react'
import { Container, Heading, IconButton, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useCities } from '../hooks/useCities'
import { Suggestions } from '../components/Suggestions'
import { useViewCity } from '../hooks/useViewCity'
import { setViewCityAction } from '../reducers/viewCityActionUtils'
import { CityItem } from '../components/CityItem'
import { updateCityAPI } from '../api'
import { useDebounce } from 'use-debounce'

import type { ChangeEventHandler, FormEventHandler, FC } from 'react'
import type { City } from '../reducers/citiesReducer'
import { getCityIdByName } from '../utils'
import { updateCityAction } from '../reducers/citiesActionUtils'

export const Home: FC = () => {
  const [citiesState, dispatch] = useCities()
  const viewCity = useViewCity()
  const [inputValue, setInputValue] = useState<string>('')
  const [debouncedValue] = useDebounce(inputValue, 500)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState(false)
  const [suggestionId, setSuggestionId] = useState<number | null>(null)

  const updateCityCallback = async (city: City) => {
    const updatedCity = await updateCityAPI(city)
    if (updatedCity) {
      updateCityAction(updatedCity)(dispatch)
    } else {
      // handle an error here
    }
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value)
    setDisabled(true)
    setIsOpen(true)
  }

  const onClickSuggestion = (id: number) => {
    setViewCityAction(null)(dispatch)
    setInputValue(citiesState.cities.citiesById[id].name)
    setDisabled(false)
    setSuggestionId(id)
    setIsOpen(false)
  }

  const onSearch: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const id = suggestionId || getCityIdByName(inputValue, citiesState.cities)
    if (id !== undefined) {
      setViewCityAction(id)(dispatch)
      setInputValue('')
    }
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <form onSubmit={onSearch}>
          <InputGroup>
            <Input value={inputValue} onChange={onInputChange} />
            <InputRightElement
              children={<IconButton type="submit" isDisabled={disabled} aria-label="search" icon={<Search2Icon />} />}
            />
          </InputGroup>

          {isOpen && <Suggestions query={debouncedValue} cities={citiesState.cities} callback={onClickSuggestion} />}
        </form>

        {!isOpen && viewCity && <CityItem city={viewCity} updateCityCallback={updateCityCallback} />}
      </Container>
    </VStack>
  )
}
