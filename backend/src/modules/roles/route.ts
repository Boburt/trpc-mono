import { RootConfig, TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, publicRouter } from "@backend/trpc";
import { RolesService } from "./service";
import { rolesFindManyZod } from "./dto/roles.dto";

export const rolesRouter = publicRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        code: z.string(),
        active: z.boolean(),
      })
    )
    .mutation(({ input, ctx }) => {
      let rolesService = new RolesService(ctx.prisma);

      return rolesService.create(input);
    }),

  findMany: publicProcedure.input(rolesFindManyZod).query(({ input, ctx }) => {
    let rolesService = new RolesService(ctx.prisma);

    return rolesService.findMany(input);
  }),

  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      let rolesService = new RolesService(ctx.prisma);
      return rolesService.findOne(input.id);
    }),
});
