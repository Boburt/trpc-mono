"use client";
import { useProductRequestStore } from "@frontend_next/store/zustand/productRequest";
import { Button } from "@nextui-org/button";
import { useCallback, useState } from "react";
import ProductRequestModal from "./product-request-modal";
import { cn } from "@frontend_next/lib/utils";
import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const ProductMakeRequest = ({
  productId,
  className,
}: {
  productId?: string;
  className?: string;
}) => {
  const [quantity, setQuantity] = useState(0);
  const { isRequestMode, selectedProducts, clearSelectedProducts } =
    useProductRequestStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(Math.max(0, quantity - 1));

  const handleRequestSubmit = useCallback(
    async (formData: any) => {
      const requestData = {
        ...formData,
        products: productId
          ? [
              {
                id: productId,
                quantity,
              },
            ]
          : Object.entries(selectedProducts).map(([id, quantity]) => ({
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
    [productId, selectedProducts, clearSelectedProducts, quantity]
  );

  return (
    <>
      <div className="flex flex-col space-y-2 w-full">
        {productId && !isRequestMode && (
          <div className="flex items-center mx-auto">
            <Button isIconOnly size="sm" onClick={handleDecrement}>
              <Minus size={16} />
            </Button>
            <AnimatePresence mode="wait">
              <motion.div
                key={quantity}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="text-3xl font-bold w-16 text-center text-content4-foreground"
              >
                {quantity}
              </motion.div>
            </AnimatePresence>
            <Button isIconOnly size="sm" onClick={handleIncrement}>
              <Plus size={16} />
            </Button>
          </div>
        )}
        {productId && isRequestMode ? (
          <></>
        ) : (
          <Button
            color="primary"
            onPress={() => setIsModalOpen(true)}
            className={cn(className)}
          >
            Оставить отзыв
          </Button>
        )}
      </div>

      <ProductRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />
    </>
  );
};
