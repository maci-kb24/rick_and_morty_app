import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import type { SortOption } from "./CharacterExplorer"

type SortControlsProps = {
    sort: SortOption
    setSort: (sort: SortOption) => void
}


const SortControls = ({ sort, setSort}:SortControlsProps) => {

    const handleFieldChange = (field: "name" | "origin") => {
        setSort({
            ...sort,
            field
        })
    }

    const handleDirectionChange = (direction: "asc" | "desc") => {
        setSort({
            ...sort,
            direction
        })
    }

  return (
    <div className="space-y-4">
        <div className="text-lg font-medium">Sort By</div>
        <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="sort-field">Sort</Label>
                <Select value={sort.field} onValueChange={(value) => handleFieldChange(value as "name" | "origin")} >
                    <SelectTrigger id="sort-field">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="origin">Origin</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="sort-direction">Direction</Label>
                <Select value={sort.direction} 
                onValueChange={(value) => 
                handleDirectionChange(value as "asc" | "desc")}>
                    <SelectTrigger id="sort-direction">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  )
}

export default SortControls