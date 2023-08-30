import { trpc, ReactQueryOptions, RouterInputs } from "@admin/utils/trpc";

export function useImageSizesQuery(filter: RouterInputs["imageSizes"]["list"]) {
  return trpc.imageSizes.list.useQuery(filter);
}

export function useImageSizesCreate(
  options: ReactQueryOptions["imageSizes"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.imageSizes.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.imageSizes.list.invalidate();

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

export function useImageSizesUpdate(
  options: ReactQueryOptions["imageSizes"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.imageSizes.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.imageSizes.list.invalidate();

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

export function useImageSizesDestroy(
  options: ReactQueryOptions["imageSizes"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.imageSizes.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.imageSizes.list.invalidate();

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
