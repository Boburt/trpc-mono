import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  permissionsCreateInputSchema,
  permissionsUpdateInputSchema,
} from "@lib/zodGeneratedFiles/zod/inputTypeSchemas";
import { permissions } from "@lib/zodGeneratedFiles/zod/modelSchema";
import {
  permissionsFindManyArgsSchema,
  permissionsFindUniqueArgsSchema,
  permissionsUpdateArgsSchema,
} from "@lib/zodGeneratedFiles/zod/outputTypeSchemas";

export const permissionsRouter = publicRouter({
  add: publicProcedure
    .input(permissionsCreateInputSchema)
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
