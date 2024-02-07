import Providers from "@frontend/src/store/provider";
import ProductsList from "./products_list";
import { Offcanvas } from "./offcanvas";

export const ProductsListPage = () => {
  return (
    <Providers>
      <ProductsList />
    </Providers>
  );
};
