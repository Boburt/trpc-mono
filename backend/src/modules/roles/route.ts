import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  RolesCreateArgsSchema,
  RolesFindManyArgsSchema,
  RolesFindUniqueArgsSchema,
  RolesUpdateArgsSchema,
} from "@backend/lib/zod";

export const rolesRouter = publicRouter({
  add: publicProcedure
    .input(RolesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.rolesService.create(input);
    }),

  list: publicProcedure
    .input(RolesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.rolesService.findMany(input);
    }),

  one: publicProcedure
    .input(RolesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.rolesService.findOne(input);
    }),

  renew: publicProcedure
    .input(RolesUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.rolesService.update(input);
    }),

  delete: publicProcedure
    .input(RolesFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.rolesService.delete(input);
    }),

  cachedRoles: publicProcedure
    .input(RolesFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.rolesService.cachedRoles(input);
    }),
});
