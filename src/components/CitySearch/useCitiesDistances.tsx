import React from 'react'
import { City } from './city.types'
import { Distances } from './distance.types'
import { getCityCoordinateKey } from './utils/getCityCoordinateKey'
import { calculateDistance } from './utils/calculateDistance'

interface UseCitiesDistancesParams {
  cities: City[]
  selectedCity: City | undefined
}

export function useCitiesDistances({
  cities,
  selectedCity
}: UseCitiesDistancesParams): Distances {
  return React.useMemo(() => {
    if (!selectedCity) return {}

    return cities.reduce((prev, city): Distances => {
      return {
        ...prev,
        [getCityCoordinateKey(city)]:
          city.latitude === selectedCity.latitude &&
          city.longitude === selectedCity.longitude
            ? 0
            : calculateDistance(
                selectedCity.latitude,
                selectedCity.longitude,
                city.latitude,
                city.longitude
              )
      }
    }, {})
  }, [cities, selectedCity])
}
