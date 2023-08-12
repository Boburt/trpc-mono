import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  permissionsCreateInputSchema,
  permissionsUpdateInputSchema,
} from "@lib/zodGeneratedFiles/zod";
import { permissions } from "@lib/zodGeneratedFiles/zod";
import {
  permissionsCreateArgsSchema,
  permissionsFindManyArgsSchema,
  permissionsFindUniqueArgsSchema,
  permissionsUpdateArgsSchema,
} from "@lib/zodGeneratedFiles/zod";

export const permissionsRouter = publicRouter({
  add: publicProcedure
    .input(permissionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.permissionsService.create(input);
    }),

  list: publicProcedure
    .input(permissionsFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.permissionsService.findMany(input);
      return [];
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
});
