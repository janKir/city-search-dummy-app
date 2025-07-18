import { City } from './city.types'
import { Distances } from './distance.types'
import { getCityCoordinateKey } from './utils/getCityCoordinateKey'
import { calculateDistance } from './utils/calculateDistance'
import { useMaybeMemo } from '@/lib/maybe-memoize'

interface UseCitiesDistancesParams {
  cities: City[]
  selectedCity: City | undefined
}

export function useCitiesDistances({
  cities,
  selectedCity
}: UseCitiesDistancesParams): Distances {
  return useMaybeMemo(() => {
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
