import { ScrollYContextProvider } from './ScrollYContext'
import { CitySearch } from './CitySearch'

export function CitySearchWrapper() {
  return (
    <ScrollYContextProvider>
      <CitySearch />
    </ScrollYContextProvider>
  )
}
