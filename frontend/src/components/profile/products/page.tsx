import Providers from "@frontend/src/store/provider";
import ProductsList from "./products_list";

export const ProductsListPage = () => {
  return (
    <Providers>
      <ProductsList />
    </Providers>
  );
};
