import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import type { SortOption } from "./CharacterExplorer"
import { useLanguage } from "./LanguageProvider"

type SortControlsProps = {
    sort: SortOption
    setSort: (sort: SortOption) => void
}


const SortControls = ({ sort, setSort}:SortControlsProps) => {
    const { t } = useLanguage()

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
        <div className="text-lg font-medium">{t("sort")}</div>
        <div className="grid gap-4 sm:grid-cols-2 sort-controls">
            <div className="space-y-2">
                <Label htmlFor="sort-field">{t("sort")}</Label>
                <Select value={sort.field} onValueChange={(value) => handleFieldChange(value as "name" | "origin")} >
                    <SelectTrigger id="sort-field">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                        <SelectItem value="name">{t("name")}</SelectItem>
                        <SelectItem value="origin">{t("origin")}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="sort-direction">{t("direction")}</Label>
                <Select value={sort.direction} 
                onValueChange={(value) => 
                handleDirectionChange(value as "asc" | "desc")}>
                    <SelectTrigger id="sort-direction">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                        <SelectItem value="asc">{t("ascending")}</SelectItem>
                        <SelectItem value="desc">{t("descending")}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  )
}

export default SortControls