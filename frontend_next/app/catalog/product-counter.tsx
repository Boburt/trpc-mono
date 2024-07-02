import React from "react";
import { Button, Input } from "@nextui-org/react";
import { Plus, Minus } from "lucide-react";
import { useProductRequestStore } from "@frontend_next/store/zustand/productRequest";
import { motion, AnimatePresence } from "framer-motion";

type ProductCounterProps = {
  productId: string;
};

export function ProductCounter({ productId }: ProductCounterProps) {
  const { isRequestMode, selectedProducts, setProductQuantity } =
    useProductRequestStore();
  const quantity = selectedProducts[productId] || 0;

  if (!isRequestMode) {
    return null;
  }

  const handleIncrement = () => setProductQuantity(productId, quantity + 1);
  const handleDecrement = () =>
    setProductQuantity(productId, Math.max(0, quantity - 1));
  const handleChange = (value: number) => setProductQuantity(productId, value);

  return (
    <div className="flex items-center mx-auto">
      <Button isIconOnly size="sm" onClick={handleDecrement}>
        <Minus size={16} />
      </Button>
      {/* <Input
        type="number"
        value={quantity.toString()}
        onChange={(e) => handleChange(parseInt(e.target.value) || 0)}
        className="w-16 text-center"
      /> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quantity}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="text-3xl font-bold w-16 text-center"
        >
          {quantity}
        </motion.div>
      </AnimatePresence>
      <Button isIconOnly size="sm" onClick={handleIncrement}>
        <Plus size={16} />
      </Button>
    </div>
  );
}
