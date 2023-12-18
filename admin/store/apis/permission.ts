import { apiClient } from "@admin/utils/eden";
import { trpc, ReactQueryOptions } from "@admin/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import useToken from "../get-token";

export function usePermissionsQuery(filter: any) {
  const token = useToken();
  return useQuery({
    enabled: !!token,
    queryKey: ["permissions", filter],
    queryFn: async () => {
      const { data } = await apiClient.api.permissions.get(filter, {
        query: filter,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
}

export function usePermissionsCreate(
  options: ReactQueryOptions["permissions"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.permissions.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.permissions.list.invalidate();

      options?.onSuccess?.(
        post,
        {
          data: post,
        },
        {}
      );
    },
  });
}

export function usePermissionsUpdate(
  options: ReactQueryOptions["permissions"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.permissions.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.permissions.list.invalidate();

      options?.onSuccess?.(
        post,
        {
          data: post,
          where: {
            id: post.id,
          },
        },
        {}
      );
    },
  });
}

export function usePermissionsDestroy(
  options: ReactQueryOptions["permissions"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.permissions.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.permissions.list.invalidate();

      options?.onSuccess?.(
        post,
        {
          where: {
            id: post.id,
          },
        },
        {}
      );
    },
  });
}
