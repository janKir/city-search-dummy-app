import { City } from './city.types'
import { CitiesList } from './CitiesList'

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
  if (cities.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No cities found matching your search.
      </div>
    )
  }

  return (
    <CitiesList
      cities={cities}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
    />
  )
}
