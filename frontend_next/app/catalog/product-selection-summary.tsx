"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@nextui-org/react";
import { useProductRequestStore } from "@frontend_next/store/zustand/productRequest";
import ProductRequestModal from "./product-request-modal";

export function ProductSelectionSummary() {
  const { isRequestMode, selectedProducts, clearSelectedProducts } =
    useProductRequestStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalSelectedProducts = Object.values(selectedProducts).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const handleRequestSubmit = useCallback(
    async (formData: any) => {
      const requestData = {
        ...formData,
        products: Object.entries(selectedProducts).map(([id, quantity]) => ({
          id,
          quantity,
        })),
      };

      try {
        const response = await fetch("/api/product-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          // Handle success (e.g., show a success message, reset state)
          clearSelectedProducts();
        } else {
          // Handle error
          console.error("Failed to submit product request");
        }
      } catch (error) {
        console.error("Error submitting product request:", error);
      }
      setIsModalOpen(false);
    },
    [selectedProducts, clearSelectedProducts]
  );

  if (!isRequestMode || totalSelectedProducts === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          <p>Selected Products: {totalSelectedProducts}</p>
          <Button color="primary" onPress={() => setIsModalOpen(true)}>
            Make Request
          </Button>
        </div>
      </div>

      <ProductRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />
    </>
  );
}
