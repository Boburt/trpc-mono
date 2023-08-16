import { ReactQueryOptions, trpc } from "@frontend/utils/trpc";

export function useRolePermissionsQuery(filter: any) {
  return trpc.rolesPermissions.list.useQuery(filter);
}

export function useRolePermissionsCreate(
  options: ReactQueryOptions["rolesPermissions"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.rolesPermissions.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.rolesPermissions.list.invalidate();

      options?.onSuccess?.(post);
    },
  });
}

export function useRolePermissionsUpdate(
  options: ReactQueryOptions["rolesPermissions"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.rolesPermissions.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.rolesPermissions.list.invalidate();

      options?.onSuccess?.(post);
    },
  });
}

// export function useRolePermissionsDestroy(
//     options: ReactQueryOptions["rolesPermissions"]["delete"]
//     ) {
//     const utils = trpc.useContext();
//     return trpc.rolesPermissions.delete.useMutation({
//         ...options,
//         onSuccess: (post) => {
//         utils.rolesPermissions.list.invalidate();

//         options?.onSuccess?.(post);
//         },
//     });
// }
