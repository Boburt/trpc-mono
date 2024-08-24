"use client";
import { useProductRequestStore } from "@frontend_next/store/zustand/productRequest";
import { ProductMakeRequest } from "./product-make-request";

export function ProductSelectionSummary() {
  const { isRequestMode, selectedProducts } = useProductRequestStore();

  const totalSelectedProducts = Object.values(selectedProducts).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  if (!isRequestMode || totalSelectedProducts === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-content3 p-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          <p>Выбрано: {totalSelectedProducts}</p>
          <div className="w-4/12 md:w-2/12">
            <ProductMakeRequest />
          </div>
        </div>
      </div>
    </>
  );
}
