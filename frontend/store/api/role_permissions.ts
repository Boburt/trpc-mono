import { ReactQueryOptions, RouterInputs, trpc } from "@frontend/utils/trpc";
import { UseTRPCQueryOptions } from "@trpc/react-query/dist/shared";

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

export function useCreateManyRolePermissions(
  options: ReactQueryOptions["rolesPermissions"]["addManyPermissionsForRole"]
) {
  const utils = trpc.useContext();
  return trpc.rolesPermissions.addManyPermissionsForRole.useMutation({
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
