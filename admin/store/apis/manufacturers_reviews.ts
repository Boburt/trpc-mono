import { trpc, ReactQueryOptions } from "@admin/utils/trpc";

export function useManufacturersReviewsQuery(filter: any) {
  return trpc.manufacturersReviews.list.useQuery(filter);
}

export function useManufacturersReviewsUpdate(
  options: ReactQueryOptions["manufacturersReviews"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturersReviews.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturersReviews.list.invalidate();

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

export function useManufacturersReviewsDestroy(
  options: ReactQueryOptions["manufacturersReviews"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.manufacturersReviews.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.manufacturersReviews.list.invalidate();

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
