import { MapPin } from 'lucide-react'
import { City } from './city.types'

interface CityCoordinatesProps {
  city: City
}

export function CityCoordinates({ city }: CityCoordinatesProps) {
  return (
    <div className="flex items-center gap-1">
      <MapPin className="size-4" />
      {city.latitude.toFixed(4)}°N, {Math.abs(city.longitude).toFixed(4)}°W
    </div>
  )
}
