import { publicProcedure, publicRouter } from "@backend/trpc";
import { roles_permissionsCreateArgsSchema } from "@backend/lib/zod";

export const rolesPermissionsRouter = publicRouter({
  add: publicProcedure
    .input(roles_permissionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.rolesPermissionsService.create(input);
    }),
});
