import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  roles_permissionsCreateArgsSchema,
  roles_permissionsFindManyArgsSchema,
  roles_permissionsFindUniqueArgsSchema,
  roles_permissionsUpdateArgsSchema,
} from "@backend/lib/zod";
import { createManyPermissionsForOneRole } from "@backend/lib/custom_zod_objects/createManyPermissionsForOneRole";
import { z } from "zod";

export const rolesPermissionsRouter = publicRouter({
  add: publicProcedure
    .input(roles_permissionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.rolesPermissionsService.create(input);
    }),

  list: publicProcedure
    .input(roles_permissionsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.rolesPermissionsService.findMany(input);
    }),

  one: publicProcedure
    .input(roles_permissionsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.rolesPermissionsService.findOne(input);
    }),

  renew: publicProcedure
    .input(roles_permissionsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.rolesPermissionsService.update(input);
    }),

  // create roles_permissions router with one role and many permissions
  addManyPermissionsForRole: publicProcedure
    .input(createManyPermissionsForOneRole)
    .mutation(({ input, ctx }) => {
      return ctx.rolesPermissionsService.createManyPermissions(input);
    }),
});
