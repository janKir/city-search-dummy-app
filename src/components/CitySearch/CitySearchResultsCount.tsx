import { City } from './city.types'

interface CitySearchResultsCountProps {
  cities: City[]
}

export function CitySearchResultsCount({
  cities
}: CitySearchResultsCountProps) {
  return (
    <div className="text-muted-foreground text-sm">
      {cities.length} {cities.length === 1 ? 'city' : 'cities'} found
    </div>
  )
}
