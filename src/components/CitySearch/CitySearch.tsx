import React, { useState, useMemo } from 'react'

import { City } from './city.types'
import { CitiesSearchField } from './CitiesSearchField'
import { CitySearchHeader } from './CitySearchHeader'
import { CitySearchResultsCount } from './CitySearchResultsCount'
import { CitiesListWithPlaceholder } from './CitiesListWithPlaceholder'
import { cities } from './cities.const'
import { useCitiesDistances } from './useCitiesDistances'
import { Background } from './background/Background'

export function CitySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState<City>()

  const distances = useCitiesDistances({ cities, selectedCity })

  const filteredCities = useMemo(() => {
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.zipCode.includes(searchTerm) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className="z-10 w-full p-4">
      <Background className="z-10" />
      <div className="sticky top-0 z-50 w-full bg-white pb-2">
        <div
          className="mx-auto max-w-4xl space-y-6"
          id="city_search_content_container"
        >
          <CitySearchHeader selectedCity={selectedCity} />

          <CitiesSearchField
            searchTerm={searchTerm}
            onChangeSearch={setSearchTerm}
          />

          <CitySearchResultsCount cities={filteredCities} />
        </div>
      </div>

      <div className="relative z-40 mx-auto max-w-4xl space-y-6">
        <CitiesListWithPlaceholder
          cities={filteredCities}
          distances={distances}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
    </div>
  )
}
