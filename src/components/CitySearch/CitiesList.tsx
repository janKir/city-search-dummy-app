import { useMemo } from 'react'
import { City, CityWithDistance } from './city.types'
import { calculateDistance } from './utils/calculateDistance'
import { CitiesListEntry } from './CitiesListEntry'

interface CitiesListProps {
  cities: City[]
  selectedCity?: City
  setSelectedCity: (city: City) => void
}

export function CitiesList({
  cities: cities,
  selectedCity,
  setSelectedCity
}: CitiesListProps) {
  const citiesWithDistance = useMemo((): City[] | CityWithDistance[] => {
    if (!selectedCity) return cities

    return cities.map<CityWithDistance>((city) => ({
      ...city,
      distance:
        city.latitude === selectedCity.latitude &&
        city.longitude === selectedCity.longitude
          ? 0
          : calculateDistance(
              selectedCity.latitude,
              selectedCity.longitude,
              city.latitude,
              city.longitude
            )
    }))
  }, [cities, selectedCity])

  return (
    <div className="grid gap-4">
      {citiesWithDistance.map((city) => (
        <CitiesListEntry
          key={city.name + city.zipCode + city.state}
          city={city}
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
