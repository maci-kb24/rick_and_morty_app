import { Select, SelectTrigger, SelectItem } from "@/components/ui/select"
import type { FilterOption } from "./CharacterExplorer"
import { Label } from "@/components/ui/label"
import { SelectContent, SelectValue } from "@/components/ui/select"
import { useLanguage } from "./LanguageProvider"


type FilterControlsProps = {
    filters: FilterOption
    setFilters: (filter: FilterOption) => void
}


const FilterControls = ({ filters, setFilters}:FilterControlsProps ) => {
   const { t } = useLanguage()

   const statusOptions = [
    { value: "all", label: t("all") },
    { value: "alive", label: t("alive") },
    { value: "dead", label: t("dead") },
    { value: "unknown", label: t("unknown") },
]

const speciesOptions = [
    { value: "all", label: t("all") },
    { value: "human", label: t("human") },
    { value: "alien", label: t("alien") },
    { value: "robot", label: t("robot") },
    { value: "humanoid", label: t("humanoid") },

]

  return (
    <div className="space-y-4">
        <div className="text-lg font-medium">
            <p>{t("filter")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 filter-controls">
            <div className="space-y-2">
                <Label htmlFor="status-filter">{t("status")}</Label>
                <Select   value={filters.status || "all"} onValueChange={(value) => setFilters({ ...filters, status: value === "all" ? null : value })}>
                    <SelectTrigger id="status-filter">
                        <SelectValue placeholder={t("all")} />
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
                <Label htmlFor="species-filter">{t("species")}</Label>
                <Select value={filters.species || "all"} onValueChange={(value) => setFilters({ ...filters, species: value === "all" ? null : value })}>
                    <SelectTrigger id="species-filter">
                        <SelectValue placeholder={t("all")} />
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