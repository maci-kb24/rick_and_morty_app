"use client";

import { useEffect } from "react";
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Character } from "@/lib/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        gender
        status
        species
        origin {
          name
        }
        image
      }
    }
  }
`


const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS)
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    if (data?.characters?.results) {
      setCharacters(data.characters.results)
    }
  }, [data])

  // show error alert message
  if (error) {
     return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>An error occurred while fetching characters</AlertDescription>
      </Alert>
    )
  }

  // show empty message if no characters found
  if(!loading && characters.length === 0) 
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No characters found</p>
      </div>
  )

  // format status text
  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "alive"
      case "dead":
        return "dead"
      default:
        return "unknown"
    }
  }

  // get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500"
      case "dead":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    } 
  }

  return (
    <>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {loading && characters.length === 0 && Array(6).fill(0).map((_, i) => (
        <Card key={`skeleton-${i}`} className="p-0">
          <CardHeader className="p-0">
            <Skeleton className=" h-48 rounded-t-lg" />
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <Skeleton className="w-3/4 h-6" />
            <div className="space-y-2">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-2/3 h-4" />
              <Skeleton className="w-1/3 h-4" />
            </div>
          </CardContent>
        </Card>
        ))}

      {characters.map((character) => (
        <Card key={character.id} className="p-0">
          <CardHeader className="p-0">
            <Image src={character.image} alt={character.name} className="w-full h-48 object-cover rounded-t-lg" width={500} height={500} priority /> 
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-3">{character.name}</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Status:</span>
                <Badge className={getStatusColor(character.status)}>{formatStatus(character.status)}</Badge>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium w-20">Species:</span>
                <span className="text-sm">{character.species}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium w-20
                ">Origin:</span>
                <span className="text-sm">{character.origin.name}</span>  
              </div>
            </div>
          </CardContent>
        </Card> 
      ))}
    </div>
    </>
   
  )
}

export default CharacterList
