"use client";

import React from "react";
import { useCurrencyStore } from "@frontend_next/store/zustand/currencyStore";

type CurrencyProviderProps = {
  children: (currency: "usd" | "rub") => React.ReactNode;
  initialCurrency: "usd" | "rub";
};

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const { currency } = useCurrencyStore();

  return <>{children(currency)}</>;
};
