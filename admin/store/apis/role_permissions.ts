import { ReactQueryOptions, RouterInputs, trpc } from "@admin/utils/trpc";
import { UseTRPCQueryOptions } from "@trpc/react-query/dist/shared";

export function useRolePermissionsCreate(
  options: ReactQueryOptions["rolesPermissions"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.rolesPermissions.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.rolesPermissions.list.invalidate();

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

export function useRolePermissionsUpdate(
  options: ReactQueryOptions["rolesPermissions"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.rolesPermissions.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.rolesPermissions.list.invalidate();

      options?.onSuccess?.(
        post,
        {
          data: {},
          where: {
            role_id_permission_id: {
              role_id: post!.role_id!,
              permission_id: post!.permission_id!,
            },
          },
        },
        {}
      );
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

      options?.onSuccess?.(
        post,
        {
          role_id: "",
          permissions_ids: [""],
        },
        {}
      );
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
