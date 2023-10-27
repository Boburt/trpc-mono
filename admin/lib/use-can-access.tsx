import { useSession } from "next-auth/react";

export default function useCanAccess(permission: string): boolean {
  const { data: session, status } = useSession();
  if (!session) {
    return false;
  }

  if (!session.rights) {
    return false;
  }

  if (!session.rights.includes(permission)) {
    return false;
  }

  return true;
}
