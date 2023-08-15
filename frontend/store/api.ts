import { trpc } from "@frontend/utils/trpc";
import { createApi } from "trpc-rtk-query";

export const api = createApi({
  client: trpc, // <- your typed client from step 1
  // pass in any api options you want, such as tagTypes or reducerPath
  tagTypes: ["Permissions"],

  // reducerPath: "trpcApi",
  //   // pass in any endpoint specific options, such as providesTags or onQueryStarted for optimistic updates
  // endpointOptions: {
  //   permissions_List: {
  //     providesTags: ["PermissionsList"],
  //   },
  // },
});

export const {
  useLazyPermissions_ListQuery,
  usePermissions_ListQuery,
  usePermissions_AddMutation,
  usePermissions_OneQuery,
  usePermissions_RenewMutation,
  util,
} = api;
