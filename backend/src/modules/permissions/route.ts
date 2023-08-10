import { RootConfig, TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, publicRouter } from "@backend/trpc";
import { PermissionsService } from "./service";
import {
  permissionsAdd,
  permissionsList,
  permissionsMutation,
  permissionsOne,
  permissionsRenew,
} from "@lib/zod_objects/permissions/z_objects";

export const permissionsRouter = publicRouter({
  add: publicProcedure.input(permissionsMutation).mutation(({ input, ctx }) => {
    let permissionsService = new PermissionsService(ctx.prisma);

    return permissionsService.create(input);
  }),

  list: publicProcedure.input(permissionsList).query(async ({ input, ctx }) => {
    let permissionsService = new PermissionsService(ctx.prisma);
    console.log("input", input);
    return await permissionsService.findMany(input);
  }),

  one: publicProcedure.input(permissionsOne).query(({ input, ctx }) => {
    let permissionsService = new PermissionsService(ctx.prisma);
    return permissionsService.findOne(input);
  }),

  renew: publicProcedure
    .input(permissionsMutation)
    .mutation(async ({ input, ctx }) => {
      let permissionsService = new PermissionsService(ctx.prisma);

      return await permissionsService.update(input);
    }),
});
