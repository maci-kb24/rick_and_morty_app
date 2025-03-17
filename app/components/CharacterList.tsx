"use client";

import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FilterOption, SortOption } from "./CharacterExplorer";
import { useLanguage } from "./LanguageProvider";
import Pagination from "./Pagination";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
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
`;

interface Character {
  id: string;
  name: string;
  gender: string;
  status: string;
  species: string;
  origin: {
    name: string;
  };
  image: string;
}

type CharacterListProps = {
  filters: FilterOption;
  sort: SortOption;
};

const CharacterList = ({ filters, sort }: CharacterListProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const { t } = useLanguage()
  const [totalPages, setTotalPages] = useState(0);

  // create filter object for GraphQL query
  const filterVariables = {
    status: filters.status || undefined,
    species: filters.species || undefined,
  };

  // Query characters from  API
  const { loading, error, data, refetch } = useQuery(
    GET_CHARACTERS,
    {
      variables: {
        filter: filterVariables,
        page: page,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  // reset when filter change
  useEffect(() => {
    setCharacters([]);
    setPage(1);
    refetch({
      filter: filterVariables,
      page: 1,
    })
  }, [filters, refetch]);

  useEffect(() => {
    if (data?.characters?.results) {
      setCharacters(data.characters.results);
      setTotalPages(data.characters.info.pages);
    }
  }, [data]);

  // show error alert message
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
         {t("error")} 
        </AlertDescription>
      </Alert>
    );
  }

  // format status text
  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "alive";
      case "dead":
        return "dead";
      default:
        return "unknown";
    }
  };

  // get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handlePageChange = (newPage: number) => {
    if(newPage === page || loading ) return

    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })

    refetch({
      filter: filterVariables,
      page: newPage,
    })

  };

  // sort characters
  const sortedCharacters = [...characters].sort((a, b) => {
    let valueA, valueB;

    if (sort.field === "name") {
      valueA = a.name;
      valueB = b.name;
    } else {
      valueA = a.origin.name;
      valueB = b.origin.name;
    }

    if (sort.direction === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  // show empty message if no characters found
  if (!loading && sortedCharacters.length === 0)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t("noResults")}</p>
      </div>
    );

 
  

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          characters.length === 0 &&
          Array(6)
            .fill(0)
            .map((_, i) => (
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

        {sortedCharacters.map((character) => (
          <Card key={character.id} className="p-0">
            <CardHeader className="p-0">
              <Image
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover rounded-t-lg"
                width={500}
                height={500}
                priority
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-3">{character.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium w-20">
                    {t("status")}
                  </span>
                  <Badge className={getStatusColor(character.status)}>
                    {formatStatus(character.status)}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium w-20">{t("species")}:</span>
                  <span>{character.species}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium w-20">{t("gender")}:</span>
                  <span>{character.gender}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium w-20">
                    {t("origin")}:
                  </span>
                  <span>{character.origin.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={loading}
          />
          <div className="text-center text-sm text-muted-foreground mt-2">
            <span className="cursor-pointer">{t("page")} {page} {t("of")} {totalPages}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterList;
