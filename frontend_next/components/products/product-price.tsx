"use client";
import { ProductsWithRelations } from "@backend/modules/products/dtos/list.dto";
import { CurrencyProvider } from "../providers/CurrencyProvider";
import { cn } from "@frontend_next/lib/utils";
import { useCurrencyStore } from "@frontend_next/store/zustand/currencyStore";

export const ProductPrice: React.FC<
  ProductsWithRelations & {
    className?: string;
  }
> = ({ price_rub, price_usd, className }) => {
  const { currency } = useCurrencyStore();
  const displayPrice =
    currency === "usd"
      ? `${Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(+price_usd!)}`
      : `${Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(+price_rub!)}`;
  return (
    <p className={cn(["text-small font-medium text-default-700", className])}>
      {displayPrice}
    </p>
  );
};
