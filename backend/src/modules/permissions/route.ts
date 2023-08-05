import { RootConfig, TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, publicRouter } from "@backend/trpc";
import { PermissionsService } from "./service";
import { permissionsFindManyZod } from "./dto/permissions.dto";

export const permissionsRouter = publicRouter({
  create: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        description: z.string(),
        active: z.boolean(),
      })
    )
    .mutation(({ input, ctx }) => {
      let permissionsService = new PermissionsService(ctx.prisma);

      return permissionsService.create(input);
    }),

  findMany: publicProcedure
    .input(permissionsFindManyZod)
    .query(({ input, ctx }) => {
      let permissionsService = new PermissionsService(ctx.prisma);

      return permissionsService.findMany(input);
    }),

  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      let permissionsService = new PermissionsService(ctx.prisma);
      return permissionsService.findOne(input.id);
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        slug: z.string(),
        description: z.string(),
        active: z.boolean(),
      })
    )
    .mutation(({ input, ctx }) => {
      let permissionsService = new PermissionsService(ctx.prisma);

      return permissionsService.update(input.id, input);
    }),
});
