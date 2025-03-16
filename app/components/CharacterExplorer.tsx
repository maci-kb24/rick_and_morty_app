"use client"

import { Card, CardContent } from '@/components/ui/card'
import { ApolloProvider } from './ApolloProvider'
import CharacterList from './CharacterList'
import { useState } from 'react'
import FilterControls from './FilterControls'


export type FilterOption = {
    status: string | null
    species: string | null
  }

const CharacterExplorer = () => {
    const [filters, setFilters] = useState<FilterOption>({
        status: null,
        species: null
    })
  return (
    <ApolloProvider>
        <Card className='mb-6'>
            <CardContent>
                <div className='grid gap-6 md:grid-cols-2'>
                <FilterControls filters={filters} setFilters={setFilters} />
                </div>
            </CardContent>
        </Card>
        <CharacterList filters={filters} />
    </ApolloProvider>
  )
}

export default CharacterExplorer