import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { useRef, useEffect, useState } from 'react'

type CitiesSearchFieldProps = {
  searchTerm: string
  onChangeSearch: (term: string) => void
}

export function CitiesSearchField({
  searchTerm,
  onChangeSearch
}: CitiesSearchFieldProps) {
  // Throttle onChangeSearch to 1 second
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastValueRef = useRef(searchTerm)
  const [searchTermInternal, setSearchTermInternal] = useState(searchTerm)

  useEffect(() => {
    lastValueRef.current = searchTerm
    setSearchTermInternal(searchTerm)
  }, [searchTerm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTermInternal(value)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      if (lastValueRef.current !== value) {
        onChangeSearch(value)
      }
    }, 500)
  }

  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <Input
        placeholder="Search cities by name, zip code, or state..."
        value={searchTermInternal}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
}
