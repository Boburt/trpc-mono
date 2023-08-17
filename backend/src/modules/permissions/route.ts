import {
  permissionsCreateArgsSchema,
  permissionsFindManyArgsSchema,
  permissionsFindUniqueArgsSchema,
  permissionsUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const permissionsRouter = publicRouter({
  add: publicProcedure
    .input(permissionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.permissionsService.create(input);
    }),

  list: publicProcedure
    .input(permissionsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.permissionsService.findMany(input);
    }),

  one: publicProcedure
    .input(permissionsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.permissionsService.findOne(input);
    }),

  renew: publicProcedure
    .input(permissionsUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.permissionsService.update(input);
    }),

  delete: publicProcedure
    .input(permissionsFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.permissionsService.delete(input);
    }),

  cachedPermissions: publicProcedure
    .input(permissionsFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.permissionsService.cachedPermissions(input);
    }),
});
