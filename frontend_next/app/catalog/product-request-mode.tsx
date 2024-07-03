import React from "react";
import { Switch } from "@nextui-org/react";
import { useProductRequestStore } from "@frontend_next/store/zustand/productRequest";

export function RequestModeSwitcher() {
  const { isRequestMode, setRequestMode } = useProductRequestStore();

  return (
    <Switch
      isSelected={isRequestMode}
      onChange={() => setRequestMode(!isRequestMode)}
    >
      Оптом
    </Switch>
  );
}
