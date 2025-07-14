import { Hash, Navigation, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { formatNumber } from './utils/formatNumber'
import { City, CityWithDistance } from './city.types'
import { calculateDistance } from './utils/calculateDistance'
import { useMemo } from 'react'
import { CityCoordinates } from './CityCoordinates'

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
        <Card
          key={city.name + city.zipCode + city.state}
          className={`cursor-pointer transition-all hover:shadow-md ${
            city.latitude === selectedCity?.latitude &&
            city.longitude === selectedCity?.longitude
              ? 'bg-blue-50 ring-2 ring-blue-500'
              : ''
          }`}
          onClick={() => setSelectedCity(city)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">
                  {city.name}, {city.state}
                </CardTitle>
                <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Hash className="size-4" />
                    {city.zipCode}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="size-4" />
                    {formatNumber(city.inhabitants)}
                  </div>
                </div>
              </div>
              {selectedCity &&
                'distance' in city &&
                city.distance !== undefined && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Navigation className="size-4" />
                      {city.distance === 0
                        ? 'Selected'
                        : `${city.distance?.toFixed(0)} km`}
                    </div>
                  </div>
                )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-muted-foreground text-sm">
              <CityCoordinates city={city} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
