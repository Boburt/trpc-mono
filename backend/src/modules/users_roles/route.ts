import { publicRouter } from "@backend/trpc";
import { publicProcedure } from "@backend/trpc";
import {
  Users_rolesCreateArgsSchema,
} from "@backend/lib/zod";
import { Users_rolesFindManyArgsSchema } from "@backend/lib/zod";
import { Users_rolesFindUniqueArgsSchema } from "@backend/lib/zod";
import { Users_rolesUpdateArgsSchema } from "@backend/lib/zod";
import { createManyRolesForUserSchema } from "@backend/lib/custom_zod_objects/createManyRolesForUser";

export const usersRolesRouter = publicRouter({
  add: publicProcedure
    .input(Users_rolesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersRolesService.create(input);
    }),
  list: publicProcedure
    .input(Users_rolesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersRolesService.findMany(input);
    }),
  one: publicProcedure
    .input(Users_rolesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersRolesService.findOne(input);
    }),
  renew: publicProcedure
    .input(Users_rolesUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersRolesService.update(input);
    }),

  createManyRoles: publicProcedure
    .input(createManyRolesForUserSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersRolesService.createManyRoles(input);
    }),
});
