import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterOutputs, trpc } from "../../../utils/trpc";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import CategoriesFilterClient from "./CategoriesClient";

export default function CategoriesServerReact({
  categories,
  pathname,
}: {
  categories: RouterOutputs["categories"]["activeCachedCategories"];
  pathname: string;
}) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `${import.meta.env.PUBLIC_TRPC_API_URL}/trpc`,
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <CategoriesFilterClient initialData={categories} pathname={pathname} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
