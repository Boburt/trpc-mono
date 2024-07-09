import { apiClient } from "@admin/utils/eden";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useCanAccess(permission: string): boolean {
  const { data: session, status } = useSession();
  const [canAccess, setCanAccess] = useState(false);

  const { data } = useQuery({
    queryKey: ["check-permission", session?.accessToken],
    queryFn: async () => {
      const { data } = await apiClient.api.users.my_permissions.get({
        $headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      return data;
    },
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCanAccess(data.includes(permission));
    }
  }, [data, permission]);

  return canAccess;
}
