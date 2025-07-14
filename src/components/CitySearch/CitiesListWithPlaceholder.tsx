import { City } from './city.types'
import { CitiesList } from './CitiesList'
import { useRef } from 'react'

interface CitiesListWithPlaceholderProps {
  cities: City[]
  selectedCity?: City
  setSelectedCity: (city: City) => void
}

export function CitiesListWithPlaceholder({
  cities: cities,
  selectedCity,
  setSelectedCity
}: CitiesListWithPlaceholderProps) {
  const renderCount = useRef(0)
  renderCount.current += 1

  if (cities.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No cities found matching your search.
      </div>
    )
  }

  return (
    <div>
      {renderCount.current} renders
      <CitiesList
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </div>
  )
}
