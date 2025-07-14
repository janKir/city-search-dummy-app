import { Hash, Navigation, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { City, CityWithDistance } from './city.types'
import { formatNumber } from './utils/formatNumber'
import { CityCoordinates } from './CityCoordinates'
import React, { useRef } from 'react'

interface CitiesListEntryProps {
  city: City | CityWithDistance
  isSelected: boolean
  onSelect: (city: City) => void
  showDistance: boolean
}

function CitiesListEntryMemo({
  city,
  isSelected,
  onSelect,
  showDistance
}: CitiesListEntryProps) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <Card
      key={city.name + city.zipCode + city.state}
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'bg-blue-50 ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onSelect(city)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">
              {city.name}, {city.state} ({renderCount.current} renders)
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
          {showDistance &&
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
  )
}

export const CitiesListEntry = React.memo(
  CitiesListEntryMemo,
  (prev, next) =>
    prev.city.latitude === next.city.latitude &&
    prev.city.longitude === next.city.longitude &&
    (prev.city as CityWithDistance).distance ===
      (next.city as CityWithDistance).distance &&
    prev.isSelected === next.isSelected &&
    prev.onSelect === next.onSelect &&
    prev.showDistance === next.showDistance
)
