import {
  sessionsCreateArgsSchema,
  sessionsDeleteArgsSchema,
  sessionsFindManyArgsSchema,
  sessionsFindUniqueArgsSchema,
  sessionsUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const sessionsRouter = publicRouter({
  add: publicProcedure
    .input(sessionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.sessionsService.create(input);
    }),

  list: publicProcedure
    .input(sessionsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.sessionsService.findMany(input);
    }),

  one: publicProcedure
    .input(sessionsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.sessionsService.findOne(input);
    }),

  renew: publicProcedure
    .input(sessionsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.sessionsService.update(input);
    }),

  delete: publicProcedure
    .input(sessionsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.sessionsService.delete(input);
    }),
});
