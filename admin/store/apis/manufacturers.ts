import { trpc, ReactQueryOptions, RouterInputs } from "@admin/utils/trpc";

export function useManufacturersQuery(
  filter: RouterInputs["manufacturers"]["list"]
) {
  return trpc.manufacturers.list.useQuery(filter);
}

export function useManufacturersCreate(
  options: ReactQueryOptions["manufacturers"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturers.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturers.list.invalidate();

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

export function useManufacturersUpdate(
  options: ReactQueryOptions["manufacturers"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturers.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturers.list.invalidate();

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

export function useManufacturersDestroy(
  options: ReactQueryOptions["manufacturers"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturers.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturers.list.invalidate();

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
