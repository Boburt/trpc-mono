import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  permissionsList,
  permissionsMutation,
  permissionsOne,
} from "@lib/zod_objects/permissions/z_objects";

export const permissionsRouter = publicRouter({
  add: publicProcedure.input(permissionsMutation).mutation(({ input, ctx }) => {
    return ctx.permissionsService.create(input);
  }),

  list: publicProcedure.input(permissionsList).query(async ({ input, ctx }) => {
    return await ctx.permissionsService.findMany(input);
    return [];
  }),

  one: publicProcedure.input(permissionsOne).query(({ input, ctx }) => {
    return ctx.permissionsService.findOne(input);
  }),

  renew: publicProcedure
    .input(permissionsMutation)
    .mutation(async ({ input, ctx }) => {
      return await ctx.permissionsService.update(input);
    }),
});
