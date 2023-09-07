import { RouterOutputs } from "@frontend/src/utils/trpc";
import Providers from "@frontend/src/store/provider";
import ManufacturersListClient from "./ManufacturersListClient";

export default function ManufacturersListClientProvider({
  categorySlug,
  initialData,
}: {
  categorySlug?: string;
  initialData: RouterOutputs["manufacturers"]["list"];
}) {
  return (
    <Providers>
      <ManufacturersListClient
        categorySlug={categorySlug}
        initialData={initialData}
      />
    </Providers>
  );
}
