import { trpc, ReactQueryOptions } from "@admin/utils/trpc";

export function useSeoLinksQuery(filter: any) {
  return trpc.seoLinks.list.useQuery(filter);
}

export function useSeoLinksCreate(
  options: ReactQueryOptions["seoLinks"]["add"]
) {
  const utils = trpc.useContext();
  return trpc.seoLinks.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.seoLinks.list.invalidate();

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

export function useSeoLinksUpdate(
  options: ReactQueryOptions["seoLinks"]["renew"]
) {
  const utils = trpc.useContext();
  return trpc.seoLinks.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.seoLinks.list.invalidate();

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

export function useSeoLinksDestroy(
  options: ReactQueryOptions["seoLinks"]["delete"]
) {
  const utils = trpc.useContext();
  return trpc.seoLinks.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.seoLinks.list.invalidate();

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
