import { City } from './city.types'
import { CitiesList } from './CitiesList'
import { useRef } from 'react'
import { Distances } from './distance.types'

interface CitiesListWithPlaceholderProps {
  cities: City[]
  distances: Distances
  selectedCity?: City
  setSelectedCity: (city: City) => void
}

export function CitiesListWithPlaceholder({
  cities,
  distances,
  selectedCity,
  setSelectedCity
}: CitiesListWithPlaceholderProps) {
  const renderCount = useRef(0)
  renderCount.current += 1

  if (cities.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No cities found matching your search.
      </div>
    )
  }

  return (
    <div>
      {renderCount.current} renders (CitiesListWithPlaceholder)
      <CitiesList
        cities={cities}
        distances={distances}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </div>
  )
}
