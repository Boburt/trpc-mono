import Providers from "@frontend/src/store/provider";
import ManufacturersListClient from "./ManufacturersListClient";
import { $searchParams } from "@frontend/src/store/search_params";
import { PublicManufacturer } from "@backend/modules/manufacturers/dto/list.dto";

export default function ManufacturersListClientProvider({
  categorySlug,
  initialData,
  searchParams,
  pathname,
}: {
  categorySlug?: string;
  initialData: {
    items: PublicManufacturer[];
  };
  searchParams?: string;
  pathname?: string;
}) {
  if (searchParams) {
    $searchParams.set(searchParams);
  } else {
    $searchParams.set("");
  }

  return (
    <Providers>
      dd
      <ManufacturersListClient
        categorySlug={categorySlug}
        initialData={initialData}
        pathname={pathname}
      />
    </Providers>
  );
}
