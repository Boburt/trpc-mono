import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  rolesCreateArgsSchema,
  rolesFindManyArgsSchema,
  rolesFindUniqueArgsSchema,
  rolesUpdateArgsSchema,
} from "@backend/lib/zod";

export const rolesRouter = publicRouter({
  add: publicProcedure
    .input(rolesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.rolesService.create(input);
    }),

  list: publicProcedure
    .input(rolesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.rolesService.findMany(input);
    }),

  one: publicProcedure
    .input(rolesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.rolesService.findOne(input);
    }),

  renew: publicProcedure
    .input(rolesUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.rolesService.update(input);
    }),
});
