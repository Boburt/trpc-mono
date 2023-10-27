import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import { useMemo, useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { useStore } from "@nanostores/react";
import { $accessToken } from "./auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  const accessToken = useStore($accessToken);
  const [queryClient] = useState(() => new QueryClient());
  const trpcClient = useMemo(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `${import.meta.env.PUBLIC_TRPC_API_URL}/trpc`,
          headers() {
            if (!accessToken) return {};
            return {
              Authorization: `Bearer ${accessToken}`,
            };
          },
        }),
      ],
    });
  }, [accessToken]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
