import Providers from "@frontend/src/store/provider";
import ProductsList from "./products_list";
import { UploadTest } from "./upload_test";

export const ProductsListPage = () => {
  return (
    <Providers>
      <ProductsList />
    </Providers>
  );
};
