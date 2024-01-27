"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function useToken() {
  const { data: sessionData } = useSession();
  if (!sessionData) return null;
  if (typeof sessionData.accessToken !== "string") {
    return null;
  }

  return sessionData.accessToken;
}

function useContextualQueryClient() {
  // Create a persistent record of all available query clients
  const [queryClientMap] = useState<Record<string, QueryClient>>({});

  const token = useToken();

  const key = token ? "token" : "__no_token__";
  // Get or create a query client
  let queryClient = queryClientMap[key];
  if (!queryClient) {
    queryClient = new QueryClient();
    queryClientMap[key] = queryClient;
  }
  return {
    key,
    client: queryClient,
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = useContextualQueryClient();
  return (
    <QueryClientProvider client={queryClient.client}>
      {children}
    </QueryClientProvider>
  );
}
