import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Users, Hash, Navigation } from 'lucide-react'
import { City } from './city.types'
import { cities } from './cities.const'
import { calculateDistance } from './utils/calculateDistance'
import { formatNumber } from './utils/formatNumber'

export function CitySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  const filteredCities = useMemo(() => {
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.zipCode.includes(searchTerm) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const citiesWithDistance = useMemo(() => {
    if (!selectedCity) return filteredCities

    return filteredCities.map((city) => ({
      ...city,
      distance:
        city.id === selectedCity.id
          ? 0
          : calculateDistance(
              selectedCity.latitude,
              selectedCity.longitude,
              city.latitude,
              city.longitude
            )
    }))
  }, [filteredCities, selectedCity])

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">City Explorer</h1>
        {selectedCity ? (
          <div className="flex items-center justify-center gap-2 text-lg">
            <MapPin className="size-5 text-blue-600" />
            <span className="font-semibold">
              {selectedCity.name}, {selectedCity.state}
            </span>
            <Badge variant="secondary">{selectedCity.zipCode}</Badge>
          </div>
        ) : (
          <p className="text-muted-foreground">
            Select a city to see distances
          </p>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          placeholder="Search cities by name, zip code, or state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results count */}
      <div className="text-muted-foreground text-sm">
        {filteredCities.length}{' '}
        {filteredCities.length === 1 ? 'city' : 'cities'} found
      </div>

      {/* City List */}
      <div className="grid gap-4">
        {citiesWithDistance.map((city) => (
          <Card
            key={city.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCity?.id === city.id
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
                <div className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {city.latitude.toFixed(4)}°N,{' '}
                  {Math.abs(city.longitude).toFixed(4)}°W
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="text-muted-foreground py-8 text-center">
          No cities found matching your search.
        </div>
      )}
    </div>
  )
}
