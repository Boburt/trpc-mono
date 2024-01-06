import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useStore } from "@nanostores/react";
import { $accessToken } from "./auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  const accessToken = useStore($accessToken);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
