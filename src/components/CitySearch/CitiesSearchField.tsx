import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

type CitiesSearchFieldProps = {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function CitiesSearchField({
  searchTerm,
  setSearchTerm
}: CitiesSearchFieldProps) {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <Input
        placeholder="Search cities by name, zip code, or state..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
