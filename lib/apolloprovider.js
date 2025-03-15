"use client";

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function ApolloWrapper({ children }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://api.spacex.land/graphql/',
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}