import { trpc, ReactQueryOptions, RouterInputs } from "@admin/utils/trpc";

export function useLangsQuery(filter: RouterInputs["langs"]["list"]) {
  return trpc.langs.list.useQuery(filter);
}

export function useLangsCreate(options: ReactQueryOptions["langs"]["add"]) {
  const utils = trpc.useContext();
  return trpc.langs.add.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.langs.list.invalidate();

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

export function useLangsUpdate(options: ReactQueryOptions["langs"]["renew"]) {
  const utils = trpc.useContext();
  return trpc.langs.renew.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.langs.list.invalidate();

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

export function useLangsDestroy(options: ReactQueryOptions["langs"]["delete"]) {
  const utils = trpc.useContext();
  return trpc.langs.delete.useMutation({
    ...options,
    onSuccess: (post) => {
      utils.langs.list.invalidate();

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
