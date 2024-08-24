import { publicProcedure, publicRouter } from "@backend/trpc";

import {
  Users_permissionsCreateArgsSchema,
  Users_permissionsFindManyArgsSchema,
  Users_permissionsFindUniqueArgsSchema,
  Users_permissionsUpdateArgsSchema,
} from "@backend/lib/zod";

import { createManyPermissionsForOneUser } from "@backend/lib/custom_zod_objects/createManyPermissionsForOneUser";

export const usersPermissionsRouter = publicRouter({
  add: publicProcedure
    .input(Users_permissionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersPermissionsService.create(input);
    }),
  list: publicProcedure
    .input(Users_permissionsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersPermissionsService.findMany(input);
    }),
  one: publicProcedure
    .input(Users_permissionsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersPermissionsService.findOne(input);
    }),
  renew: publicProcedure
    .input(Users_permissionsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersPermissionsService.update(input);
    }),

  addManyPermissionsForUser: publicProcedure
    .input(createManyPermissionsForOneUser)
    .mutation(({ input, ctx }) => {
      return ctx.usersPermissionsService.createManyPermissions(input);
    }),
});
