import { publicProcedure, publicRouter } from "@backend/trpc";

import {
  users_permissionsCreateArgsSchema,
  users_permissionsFindManyArgsSchema,
  users_permissionsFindUniqueArgsSchema,
  users_permissionsUpdateArgsSchema,
} from "@backend/lib/zod";

import { createManyPermissionsForOneUser } from "@backend/lib/custom_zod_objects/createManyPermissionsForOneUser";

export const usersPermissionsRouter = publicRouter({
  add: publicProcedure
    .input(users_permissionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersPermissionsService.create(input);
    }),
  list: publicProcedure
    .input(users_permissionsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersPermissionsService.findMany(input);
    }),
  one: publicProcedure
    .input(users_permissionsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersPermissionsService.findOne(input);
    }),
  renew: publicProcedure
    .input(users_permissionsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersPermissionsService.update(input);
    }),

  addManyPermissionsForUser: publicProcedure
    .input(createManyPermissionsForOneUser)
    .mutation(({ input, ctx }) => {
      return ctx.usersPermissionsService.createManyPermissions(input);
    }),
});
