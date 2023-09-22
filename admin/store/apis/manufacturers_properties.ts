import { trpc, ReactQueryOptions, RouterInputs } from "@admin/utils/trpc";

export function useManufacturersPropertiesQuery(
  filter: RouterInputs["manufacturersProperties"]["list"]
) {
  return trpc.manufacturersProperties.list.useQuery(filter);
}

export function useManufacturersPropertiesCreate(
  options: ReactQueryOptions["manufacturersProperties"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturersProperties.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturersProperties.list.invalidate();

      options?.onSuccess?.(
        post,
        {
          /** @ts-ignore */
          data: post,
        },
        {}
      );
    },
  });
}

export function useManufacturersPropertiesUpdate(
  options: ReactQueryOptions["manufacturersProperties"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturersProperties.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturersProperties.list.invalidate();

      options?.onSuccess?.(
        post,
        {
          /** @ts-ignore */
          data: post!,
          where: {
            id: post!.id,
          },
        },
        {}
      );
    },
  });
}

export function useManufacturersPropertiesDestroy(
  options: ReactQueryOptions["manufacturersProperties"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturersProperties.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturersProperties.list.invalidate();

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
