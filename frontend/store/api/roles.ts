import { trpc, ReactQueryOptions } from "@frontend/utils/trpc";

export function useRolesQuery(filter: any) {
  return trpc.roles.list.useQuery(filter);
}

export function useRolesCreate(options: ReactQueryOptions["roles"]["add"]) {
  const utils = trpc.useContext();
  return trpc.roles.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.roles.list.invalidate();

      options?.onSuccess?.(post);
    },
  });
}

export function useRolesUpdate(options: ReactQueryOptions["roles"]["renew"]) {
  const utils = trpc.useContext();
  return trpc.roles.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.roles.list.invalidate();

      options?.onSuccess?.(post);
    },
  });
}

export function useRolesDestroy(options: ReactQueryOptions["roles"]["delete"]) {
  const utils = trpc.useContext();
  return trpc.roles.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.roles.list.invalidate();

      options?.onSuccess?.(post);
    },
  });
}
