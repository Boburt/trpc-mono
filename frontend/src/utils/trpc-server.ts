import type { Router } from "@backend/_routes";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
console.log('trpc url', import.meta.env.PUBLIC_TRPC_API_URL);
export const trpcClient = createTRPCProxyClient<Router>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.PUBLIC_TRPC_API_URL}/trpc`, // you should update this to use env variables
    }),
  ],
});

