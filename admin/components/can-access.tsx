import { useSession } from "next-auth/react";

export default function CanAccess({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: string;
}) {
  const { data: session, status } = useSession();
  if (!session) {
    return <></>;
  }

  if (!session.rights) {
    return <></>;
  }

  if (!session.rights.includes(permission)) {
    return <></>;
  }

  return <>{children}</>;
}
