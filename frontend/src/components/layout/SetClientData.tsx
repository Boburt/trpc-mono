import { setAuthData } from "@frontend/src/store/auth";
import { IStaticMethods } from "preline/preline";
import { useEffect } from "react";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
export default function SetClientData() {
  useEffect(() => {
    if (window.HSStaticMethods) {
      console.log("HSStaticMethods", window.HSStaticMethods);
      window.HSStaticMethods.autoInit();
    }
  }, [window.HSStaticMethods]);

  return <></>;
}
