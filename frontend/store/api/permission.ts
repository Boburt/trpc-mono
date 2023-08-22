import { trpc, ReactQueryOptions } from @admin/utils/trpc";

export function usePermissionsQuery(filter: any) {
  return trpc.permissions.list.useQuery(filter);
}

export function usePermissionsCreate(
  options: ReactQueryOptions["permissions"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.permissions.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.permissions.list.invalidate();

      options?.onSuccess?.(post);
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

      options?.onSuccess?.(post);
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

      options?.onSuccess?.(post);
    },
  });
}
