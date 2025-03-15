"use client"

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://rickandmortyapi.com/graphql",
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            characters: {
              keyArgs: ["filter"],
              merge(existing = { results: [] }, incoming) {
                return {
                  ...incoming,
                  results: [...(existing.results || []), ...(incoming.results || [])],
                }
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  })
}

export default createApolloClient


