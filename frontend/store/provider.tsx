"use client";

import { store } from "./";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@frontend/utils/trpc";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.TRPC_API_URL}/trpc`, // you should update this to use env variables
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
