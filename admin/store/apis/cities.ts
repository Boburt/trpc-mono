import { trpc, ReactQueryOptions, RouterInputs } from "@admin/utils/trpc";

export function useCitiesQuery(filter: RouterInputs["cities"]["list"]) {
  return trpc.cities.list.useQuery(filter);
}

export function useCachedCitiesQuery(filter: RouterInputs["cities"]["list"]) {
  return trpc.cities.cachedCities.useQuery(filter);
}

export function useCitiesCreate(options: ReactQueryOptions["cities"]["add"]) {
  const utils = trpc.useContext();
  return trpc.cities.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.cities.list.invalidate();

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

export function useCitiesUpdate(options: ReactQueryOptions["cities"]["renew"]) {
  const utils = trpc.useContext();
  return trpc.cities.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.cities.list.invalidate();

      options?.onSuccess?.(
        post,
        {
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

export function useCitiesDestroy(
  options: ReactQueryOptions["cities"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.cities.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.cities.list.invalidate();

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
