import { trpc, ReactQueryOptions, RouterInputs } from "@admin/utils/trpc";

export function useManufacturersPropertiesCategoriesQuery(
  filter: RouterInputs["manufacturersPropertiesCategories"]["list"]
) {
  return trpc.manufacturersPropertiesCategories.list.useQuery(filter);
}

export function useManufacturersPropertiesCategoriesCreate(
  options: ReactQueryOptions["manufacturersPropertiesCategories"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturersPropertiesCategories.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturersPropertiesCategories.list.invalidate();

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

export function useManufacturersPropertiesCategoriesUpdate(
  options: ReactQueryOptions["manufacturersPropertiesCategories"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturersPropertiesCategories.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturersPropertiesCategories.list.invalidate();

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

export function useManufacturersPropertiesCategoriesDestroy(
  options: ReactQueryOptions["manufacturersPropertiesCategories"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturersPropertiesCategories.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturersPropertiesCategories.list.invalidate();

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
