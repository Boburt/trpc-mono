import useCanAccess from "@admin/lib/use-can-access";
import { useSession } from "next-auth/react";

export default function CanAccess({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: string;
}) {
  const canAccess = useCanAccess(permission);

  if (!canAccess) {
    return <></>;
  }

  return <>{children}</>;
}
