import { create } from "zustand";

type CurrencyStore = {
  currency: "usd" | "rub";
  setCurrency: (currency: "usd" | "rub") => void;
};

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currency: "rub",
  setCurrency: (currency) => set({ currency }),
}));
