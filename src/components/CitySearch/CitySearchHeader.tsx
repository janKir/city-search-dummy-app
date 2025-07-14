import { MapPin } from 'lucide-react'
import { City } from './city.types'
import { Badge } from '../ui/badge'

interface CitySearchHeaderProps {
  selectedCity?: City
}

export function CitySearchHeader({ selectedCity }: CitySearchHeaderProps) {
  return (
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
        <p className="text-muted-foreground">Select a city to see distances</p>
      )}
    </div>
  )
}
