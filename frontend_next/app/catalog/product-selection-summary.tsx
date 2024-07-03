"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@nextui-org/react";
import { useProductRequestStore } from "@frontend_next/store/zustand/productRequest";
import ProductRequestModal from "./product-request-modal";
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
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          <p>Выбрано: {totalSelectedProducts}</p>
          <ProductMakeRequest />
        </div>
      </div>
    </>
  );
}
