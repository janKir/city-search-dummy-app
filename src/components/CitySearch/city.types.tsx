export interface City {
  name: string
  zipCode: string
  latitude: number
  longitude: number
  inhabitants: number
  state: string
}

export interface CityWithDistance extends City {
  distance: number
}
