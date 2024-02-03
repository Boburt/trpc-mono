import Providers from "@frontend/src/store/provider";
import { $searchParams } from "@frontend/src/store/search_params";
import { PublicManufacturer } from "@backend/modules/manufacturers/dto/list.dto";

export const ManufacturersPage = ({
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
}) => {
  return <div></div>;
};

export const ManufacturersPageProvider = ({
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
}) => {
  if (searchParams) {
    $searchParams.set(searchParams);
  } else {
    $searchParams.set("");
  }

  return (
    <Providers>
      <ManufacturersPage
        categorySlug={categorySlug}
        initialData={initialData}
        pathname={pathname}
        searchParams={searchParams}
      />
    </Providers>
  );
};
