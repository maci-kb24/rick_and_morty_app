"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"

// Define available languages
export const languages = {
  en: {
    name: "Name",
    status: "Status",
    species: "Species",
    direction: "Direction",
    gender: "Gender",
    origin: "Origin",
    filter: "Filter",
    sort: "Sort by",
    loadMore: "Load More",
    noResults: "No characters found",
    error: "Error loading characters",
    human: "Human",
    alien: "Alien",
    robot: "Robot",
    humanoid: "Humanoid",
    alive: "Alive",
    dead: "Dead",
    unknown: "Unknown",
    all: "All",
    ascending: "Ascending",
    descending: "Descending",
    language: "Language",
    page: "Page",
    of: "of",
    firstPage: "First Page",
    previousPage: "Previous Page",
    nextPage: "Next Page",
    lastPage: "Last Page",
  },
  de: {
    name: "Name",
    status: "Status",
    species: "Spezies",
    direction: "Richtung",
    gender: "Geschlecht",
    origin: "Herkunft",
    filter: "Filter",
    sort: "Sortieren nach",
    loadMore: "Mehr laden",
    noResults: "Keine Charaktere gefunden",
    error: "Fehler beim Laden der Charaktere",
    human: "Menschlich",
    alien: "Ausländer",
    robot: "Roboter",
    humanoid: "Humanoid",
    alive: "Lebendig",
    dead: "Tot",
    unknown: "Unbekannt",
    all: "Alle",
    ascending: "Aufsteigend",
    descending: "Absteigend",
    language: "Sprache",
    page: "Seite",
    of: "von",
    firstPage: "Erste Seite",
    previousPage: "Vorherige Seite",
    nextPage: "Nächste Seite",
    lastPage: "Letzte Seite",
  },
}

type LanguageContextType = {
  language: keyof typeof languages
  setLanguage: (lang: keyof typeof languages) => void
  t: (key: keyof typeof languages.en) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<keyof typeof languages>("en")

  const t = (key: keyof typeof languages.en) => {
    return languages[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t("language")}:</span>
      <ToggleGroup
        type="single"
        className="flex items-center gap-2 cursor-pointer"
        value={language}
        onValueChange={(value) => value && setLanguage(value as keyof typeof languages)}
      >
        <ToggleGroupItem value="en" aria-label="English" className="flex items-center justify-center p-0 w-10 h-8 cursor-pointer">
          <Image src="/gb-flag.svg" alt="English" width={24} height={16} className="rounded-sm" />
        </ToggleGroupItem>
        <ToggleGroupItem value="de" aria-label="German" className="flex items-center justify-center p-0 w-10 h-8 cursor-pointer">
          <Image src="/de-flag.svg" alt="German" width={24} height={16} className="rounded-sm" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

