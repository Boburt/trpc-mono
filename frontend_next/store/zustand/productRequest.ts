import create from "zustand";
import { persist } from "zustand/middleware";
import { persistNSync } from "persist-and-sync";

interface ProductRequestState {
  isRequestMode: boolean;
  selectedProducts: Record<string, number>;
  setRequestMode: (isRequestMode: boolean) => void;
  setProductQuantity: (productId: string, quantity: number) => void;
  clearSelectedProducts: () => void;
}

export const useProductRequestStore = create<ProductRequestState>()(
  persistNSync(
    (set) => ({
      isRequestMode: false,
      selectedProducts: {},
      setRequestMode: (isRequestMode) => set({ isRequestMode }),
      setProductQuantity: (productId, quantity) =>
        set((state) => ({
          selectedProducts: {
            ...state.selectedProducts,
            [productId]: quantity,
          },
        })),
      clearSelectedProducts: () => set({ selectedProducts: {} }),
    }),
    {
      name: "product-request-storage"
    }
  )
);
