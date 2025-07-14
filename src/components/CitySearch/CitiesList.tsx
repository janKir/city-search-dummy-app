import { City } from './city.types'
import { CitiesListEntry } from './CitiesListEntry'
import { getCityCoordinateKey } from './utils/getCityCoordinateKey'
import { Distances } from './distance.types'

interface CitiesListProps {
  cities: City[]
  distances: Distances
  selectedCity?: City
  setSelectedCity: (city: City) => void
}

export function CitiesList({
  cities,
  distances,
  selectedCity,
  setSelectedCity
}: CitiesListProps) {
  return (
    <div className="grid gap-4">
      {cities.map((city) => (
        <CitiesListEntry
          key={city.name + city.zipCode + city.state}
          city={city}
          distance={distances[getCityCoordinateKey(city)]}
          isSelected={
            city.latitude === selectedCity?.latitude &&
            city.longitude === selectedCity?.longitude
          }
          onSelect={setSelectedCity}
          showDistance={!!selectedCity}
        />
      ))}
    </div>
  )
}
