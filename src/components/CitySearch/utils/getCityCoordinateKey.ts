import { City } from '../city.types'

export function getCityCoordinateKey(city: City): string {
  return `${city.latitude},${city.longitude}`
}
