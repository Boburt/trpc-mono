import React from "react";
import { motion } from "framer-motion";
import { useCurrencyStore } from "@frontend_next/store/zustand/currencyStore";
import { Toggle } from "@frontend_next/components/ui/toggle";
import { DollarSign, RussianRuble } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@frontend_next/lib/utils";

export const CurrencyToggler = () => {
  const { currency, setCurrency } = useCurrencyStore();

  return (
    <div className="relative flex items-center bg-muted rounded-full p-0.5 w-[90px] h-[36px] border border-primary">
      <Button
        variant="ghost"
        size="sm"
        className="w-11 h-[30px] rounded-full z-10 px-0"
        onClick={() => setCurrency("usd")}
      >
        <DollarSign
          className={cn(["w-4 h-4 ", currency == "usd" && "text-white"])}
        />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-11 h-[30px] rounded-full z-10 px-0"
        onClick={() => setCurrency("rub")}
      >
        <RussianRuble
          className={cn(["w-4 h-4 ", currency == "rub" && "text-white"])}
        />
      </Button>
      <motion.div
        className="absolute top-0.5 left-0.5 w-11 h-[30px] bg-primary rounded-full"
        initial={false}
        animate={{
          x: currency === "usd" ? 0 : 40,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
    </div>
  );
};
