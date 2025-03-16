"use client"

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://rickandmortyapi.com/graphql",
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  })
}

export default createApolloClient


