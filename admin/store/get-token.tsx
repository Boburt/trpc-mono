import { useSession } from "next-auth/react";

export default function useToken() {
  const { data: sessionData } = useSession();
  if (!sessionData) return null;
  if (typeof sessionData.accessToken !== "string") {
    return null;
  }

  return sessionData.accessToken;
}
