"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@admin/utils/trpc";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { useSession } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { data: session } = useSession();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.TRPC_API_URL}/trpc`, // you should update this to use env variables
          async headers() {
            if (!session) return {};
            return {
              Authorization: `Bearer ${session.accessToken}`,
            };
          },
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