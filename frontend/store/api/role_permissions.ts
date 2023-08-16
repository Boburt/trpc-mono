import { trpc } from "@frontend/utils/trpc";

export function useRolePermissionsQuery(filter: any) {
  return trpc.role_permissions.list.useQuery(filter);
}
