import { RouterOutputs } from "@frontend/src/utils/trpc";
import Providers from "@frontend/src/store/provider";
import ManufacturersListClient from "./ManufacturersListClient";
import { $searchParams } from "@frontend/src/store/search_params";

export default function ManufacturersListClientProvider({
  categorySlug,
  initialData,
  searchParams,
}: {
  categorySlug?: string;
  initialData: RouterOutputs["manufacturers"]["publicList"];
  searchParams?: string;
}) {
  if (searchParams) {
    $searchParams.set(searchParams);
  } else {
    $searchParams.set("");
  }

  return (
    <Providers>
      <ManufacturersListClient
        categorySlug={categorySlug}
        initialData={initialData}
      />
    </Providers>
  );
}
