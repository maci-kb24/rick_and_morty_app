"use client"

import { ApolloProvider as BaseApolloProvider } from "@apollo/client"
import createApolloClient from "../../lib/apolloClient"
import { type ReactNode, useState, useEffect } from "react"

export function ApolloProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ReturnType<typeof createApolloClient> | null>(null)

  useEffect(() => {
    // Create Apollo client on the client side
    setClient(createApolloClient())
  }, [])

  if (!client) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>
}

