"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@admin/utils/trpc";
import { useCallback, useEffect, useMemo, useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";

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
  const token = useToken();
  const queryClient = useContextualQueryClient();

  const trpcClient = useMemo(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.TRPC_API_URL}/trpc`, // you should update this to use env variables
          headers() {
            if (!token) return {};
            return {
              Authorization: `Bearer ${token}`,
            };
          },
        }),
      ],
    });
  }, [token]);

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient.client}
      key={queryClient.key}
    >
      <QueryClientProvider client={queryClient.client}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
