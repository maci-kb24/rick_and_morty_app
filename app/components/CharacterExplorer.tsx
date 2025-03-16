"use client"

import { Card, CardContent } from '@/components/ui/card'
import { ApolloProvider } from './ApolloProvider'
import CharacterList from './CharacterList'
import { useState } from 'react'
import FilterControls from './FilterControls'
import SortControls from './SortControls'

export type FilterOption = {
    status: string | null
    species: string | null
  }

export type SortOption = {
    field: "name" | "origin"
    direction: "asc" | "desc"
}

const CharacterExplorer = () => {
    const [filters, setFilters] = useState<FilterOption>({
        status: null,
        species: null
    })

    const [sort, setSort] = useState<SortOption>({
        field: "name",
        direction: "asc"
    })
  return (
    <ApolloProvider>
        <Card className='mb-6'>
            <CardContent>
                <div className='grid gap-6 md:grid-cols-2'>
                <FilterControls filters={filters} setFilters={setFilters} />
                <SortControls sort={sort} setSort={setSort} />
                </div>
            </CardContent>
        </Card>
        <CharacterList filters={filters} sort={sort} />
    </ApolloProvider>
  )
}

export default CharacterExplorer