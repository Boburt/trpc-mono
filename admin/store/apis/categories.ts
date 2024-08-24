import { trpc, ReactQueryOptions, RouterInputs } from "@admin/utils/trpc";

export function useCategoriesQuery(filter: RouterInputs["categories"]["list"]) {
  return trpc.categories.list.useQuery(filter);
}

export function useCategoriesCreate(
  options: ReactQueryOptions["categories"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.categories.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.categories.list.invalidate();

      options?.onSuccess?.(
        post,
        {
          // @ts-ignore
          data: post,
        },
        {}
      );
    },
  });
}

export function useCategoriesUpdate(
  options: ReactQueryOptions["categories"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.categories.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.categories.list.invalidate();

      options?.onSuccess?.(
        post,
        {
          // @ts-ignore
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

export function useCategoriesDestroy(
  options: ReactQueryOptions["categories"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.categories.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.categories.list.invalidate();

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
