import React, { useState, useMemo } from 'react'

import { City } from './city.types'
import { cities } from './cities.const'
import { CitiesSearchField } from './CitiesSearchField'
import { CitySearchHeader } from './CitySearchHeader'
import { CitySearchResultsCount } from './CitySearchResultsCount'
import { CitiesListWithPlaceholder } from './CitiesListWithPlaceholder'

export function CitySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState<City>()

  const filteredCities = useMemo(() => {
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.zipCode.includes(searchTerm) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4">
      <CitySearchHeader selectedCity={selectedCity} />

      <CitiesSearchField
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CitySearchResultsCount cities={filteredCities} />

      <CitiesListWithPlaceholder
        cities={filteredCities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </div>
  )
}
