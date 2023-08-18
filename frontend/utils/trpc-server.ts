import type { Router } from "@backend/_routes";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
export const trpcClient = createTRPCProxyClient<Router>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc", // you should update this to use env variables
    }),
  ],
});
