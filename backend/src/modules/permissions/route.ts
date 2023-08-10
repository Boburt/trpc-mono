import { RootConfig, TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, publicRouter } from "@backend/trpc";
import { PermissionsService } from "./service";
import {
  permissionsAdd,
  permissionsList,
  permissionsOne,
  permissionsRenew,
} from "@lib/zod_objects/permissions/z_objects";

export const permissionsRouter = publicRouter({
  add: publicProcedure.input(permissionsAdd).mutation(({ input, ctx }) => {
    let permissionsService = new PermissionsService(ctx.prisma);

    return permissionsService.create(input);
  }),

  list: publicProcedure.input(permissionsList).query(({ input, ctx }) => {
    let permissionsService = new PermissionsService(ctx.prisma);

    return permissionsService.findMany(input);
  }),

  one: publicProcedure.input(permissionsOne).query(({ input, ctx }) => {
    let permissionsService = new PermissionsService(ctx.prisma);
    return permissionsService.findOne(input);
  }),

  renew: publicProcedure.input(permissionsRenew).mutation(({ input, ctx }) => {
    let permissionsService = new PermissionsService(ctx.prisma);

    return permissionsService.update(input);
  }),
});
