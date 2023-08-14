import { permissions } from "@backend/lib/zod";
import { trpc, ReactQueryOptions } from "@frontend/utils/trpc";

export function usePermissionsQuery(filter: any) {
  return trpc.permissions.list.useQuery(filter);
}

export function usePermissionsCreate(
  options: ReactQueryOptions["permissions"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.permissions.add.useMutation({
    ...options,
    onSuccess: () => utils.permissions.list.invalidate(),
  });
}

export function usePermissionsUpdate(
  options: ReactQueryOptions["permissions"]["update"]
) {
  const utils = trpc.useContext();
  return trpc.permissions.renew.useMutation({
    ...options,
    onSuccess: () => utils.permissions.list.invalidate(),
  });
}
