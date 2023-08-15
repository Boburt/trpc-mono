import { publicRouter } from "@backend/trpc";
import { publicProcedure } from "@backend/trpc";
import { users_rolesCreateArgsSchema } from "@backend/lib/zod";
import { users_rolesFindManyArgsSchema } from "@backend/lib/zod";
import { users_rolesFindUniqueArgsSchema } from "@backend/lib/zod";
import { users_rolesUpdateArgsSchema } from "@backend/lib/zod";
import { createManyRolesForUserSchema } from "@backend/lib/custom_zod_objects/createManyRolesForUser";

export const usersRolesRouter = publicRouter({
  add: publicProcedure
    .input(users_rolesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersRolesService.create(input);
    }),
  list: publicProcedure
    .input(users_rolesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersRolesService.findMany(input);
    }),
  one: publicProcedure
    .input(users_rolesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersRolesService.findOne(input);
    }),
  renew: publicProcedure
    .input(users_rolesUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersRolesService.update(input);
    }),

  createManyRoles: publicProcedure
    .input(createManyRolesForUserSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersRolesService.createManyRoles(input);
    }),
});
