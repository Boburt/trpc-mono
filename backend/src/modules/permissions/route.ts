import {
  PermissionsCreateArgsSchema,
  PermissionsFindManyArgsSchema,
  PermissionsFindUniqueArgsSchema,
  PermissionsUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const permissionsRouter = publicRouter({
  add: publicProcedure
    .input(PermissionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.permissionsService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "permissions.list",
    })
    .use(checkPermission)
    .input(PermissionsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.permissionsService.findMany(input);
    }),

  one: publicProcedure
    .input(PermissionsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.permissionsService.findOne(input);
    }),

  renew: publicProcedure
    .input(PermissionsUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.permissionsService.update(input);
    }),

  delete: publicProcedure
    .input(PermissionsFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.permissionsService.delete(input);
    }),

  cachedPermissions: publicProcedure
    .input(PermissionsFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.permissionsService.cachedPermissions(input);
    }),
});
