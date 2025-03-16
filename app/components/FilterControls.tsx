import { Select, SelectTrigger, SelectItem } from "@/components/ui/select"
import type { FilterOption } from "./CharacterExplorer"
import { Label } from "@/components/ui/label"
import { SelectContent, SelectValue } from "@radix-ui/react-select"


type FilterControlsProps = {
    filters: FilterOption
    setFilters: (filter: FilterOption) => void
}

const statusOptions = [
    { value: "all", label: "All" },
    { value: "alive", label: "Alive" },
    { value: "dead", label: "Dead" },
    { value: "unknown", label: "Unknown" },
]

const speciesOptions = [
    { value: "all", label: "All" },
    { value: "human", label: "Human" },
    { value: "alien", label: "Alien" },
    { value: "robot", label: "Robot" },
    { value: "humanoid", label: "Humanoid" },

]

const FilterControls = ({ filters, setFilters}:FilterControlsProps ) => {
  return (
    <div className="space-y-4">
        <div className="text-lg font-medium">
            <p>Filter</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select  value={filters.status || "all"} onValueChange={(value) => setFilters({ ...filters, status: value === "all" ? null : value })}>
                    <SelectTrigger id="status-filter">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                        {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="species-filter">Species</Label>
                <Select value={filters.species || "all"} onValueChange={(value) => setFilters({ ...filters, species: value === "all" ? null : value })}>
                    <SelectTrigger id="species-filter">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                        {speciesOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  )
}

export default FilterControls