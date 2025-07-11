import React, { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Users, Hash, Navigation } from "lucide-react"

interface City {
  id: number 
  name: string
  zipCode: string
  latitude: number
  longitude: number
  inhabitants: number
  state: string
}

const cities: City[] = [
  {
    id: 1,
    name: "New York",
    zipCode: "10001",
    latitude: 40.7128,
    longitude: -74.006,
    inhabitants: 8336817,
    state: "NY",
  },
  {
    id: 2,
    name: "Los Angeles",
    zipCode: "90001",
    latitude: 34.0522,
    longitude: -118.2437,
    inhabitants: 3979576,
    state: "CA",
  },
  {
    id: 3,
    name: "Chicago",
    zipCode: "60601",
    latitude: 41.8781,
    longitude: -87.6298,
    inhabitants: 2693976,
    state: "IL",
  },
  {
    id: 4,
    name: "Houston",
    zipCode: "77001",
    latitude: 29.7604,
    longitude: -95.3698,
    inhabitants: 2320268,
    state: "TX",
  },
  {
    id: 5,
    name: "Phoenix",
    zipCode: "85001",
    latitude: 33.4484,
    longitude: -112.074,
    inhabitants: 1680992,
    state: "AZ",
  },
  {
    id: 6,
    name: "Philadelphia",
    zipCode: "19101",
    latitude: 39.9526,
    longitude: -75.1652,
    inhabitants: 1584064,
    state: "PA",
  },
  {
    id: 7,
    name: "San Antonio",
    zipCode: "78201",
    latitude: 29.4241,
    longitude: -98.4936,
    inhabitants: 1547253,
    state: "TX",
  },
  {
    id: 8,
    name: "San Diego",
    zipCode: "92101",
    latitude: 32.7157,
    longitude: -117.1611,
    inhabitants: 1423851,
    state: "CA",
  },
  { id: 9, name: "Dallas", zipCode: "75201", latitude: 32.7767, longitude: -96.797, inhabitants: 1343573, state: "TX" },
  {
    id: 10,
    name: "San Jose",
    zipCode: "95101",
    latitude: 37.3382,
    longitude: -121.8863,
    inhabitants: 1021795,
    state: "CA",
  },
  {
    id: 11,
    name: "Austin",
    zipCode: "73301",
    latitude: 30.2672,
    longitude: -97.7431,
    inhabitants: 978908,
    state: "TX",
  },
  {
    id: 12,
    name: "Jacksonville",
    zipCode: "32099",
    latitude: 30.3322,
    longitude: -81.6557,
    inhabitants: 949611,
    state: "FL",
  },
  {
    id: 13,
    name: "Fort Worth",
    zipCode: "76101",
    latitude: 32.7555,
    longitude: -97.3308,
    inhabitants: 918915,
    state: "TX",
  },
  {
    id: 14,
    name: "Columbus",
    zipCode: "43085",
    latitude: 39.9612,
    longitude: -82.9988,
    inhabitants: 905748,
    state: "OH",
  },
  {
    id: 15,
    name: "Charlotte",
    zipCode: "28201",
    latitude: 35.2271,
    longitude: -80.8431,
    inhabitants: 885708,
    state: "NC",
  },
]

// Haversine formula to calculate distance between two points on Earth
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function formatNumber(num: number): string {
  return num.toLocaleString()
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  const filteredCities = useMemo(() => {
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.zipCode.includes(searchTerm) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const citiesWithDistance = useMemo(() => {
    if (!selectedCity) return filteredCities

    return filteredCities.map((city) => ({
      ...city,
      distance:
        city.id === selectedCity.id
          ? 0
          : calculateDistance(selectedCity.latitude, selectedCity.longitude, city.latitude, city.longitude),
    }))
  }, [filteredCities, selectedCity])

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">City Explorer</h1>
        {selectedCity ? (
          <div className="flex items-center justify-center gap-2 text-lg">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">
              {selectedCity.name}, {selectedCity.state}
            </span>
            <Badge variant="secondary">{selectedCity.zipCode}</Badge>
          </div>
        ) : (
          <p className="text-muted-foreground">Select a city to see distances</p>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search cities by name, zip code, or state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredCities.length} {filteredCities.length === 1 ? "city" : "cities"} found
      </div>

      {/* City List */}
      <div className="grid gap-4">
        {citiesWithDistance.map((city) => (
          <Card
            key={city.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCity?.id === city.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setSelectedCity(city)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {city.name}, {city.state}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      {city.zipCode}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {formatNumber(city.inhabitants)}
                    </div>
                  </div>
                </div>
                {selectedCity && "distance" in city && city.distance !== undefined && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Navigation className="w-4 h-4" />
                      {city.distance === 0 ? "Selected" : `${city.distance.toFixed(0)} mi`}
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {city.latitude.toFixed(4)}°N, {Math.abs(city.longitude).toFixed(4)}°W
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No cities found matching your search.</div>
      )}
    </div>
  )
}
 