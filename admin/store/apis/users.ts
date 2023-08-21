import { trpc, ReactQueryOptions } from "@frontend/utils/trpc";

export function useUsersQuery(filter: any) {
  return trpc.users.list.useQuery(filter);
}

export function useUsersCreate(options: ReactQueryOptions["users"]["add"]) {
  const utils = trpc.useContext();
  return trpc.users.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.users.list.invalidate();

      options?.onSuccess?.(post, {
        data: post
      }, {});
    },
  });
}

export function useUsersUpdate(options: ReactQueryOptions["users"]["renew"]) {
  const utils = trpc.useContext();
  return trpc.users.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.users.list.invalidate();

      options?.onSuccess?.(post, {
        data: post,
        where: {
          id: post.id
        }
      }, {});
    },
  });
}
