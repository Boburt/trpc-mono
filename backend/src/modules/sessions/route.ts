import {
  SessionsCreateArgsSchema,
  SessionsDeleteArgsSchema,
  SessionsFindManyArgsSchema,
  SessionsFindUniqueArgsSchema,
  SessionsUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const sessionsRouter = publicRouter({
  add: publicProcedure
    .input(SessionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.sessionsService.create(input);
    }),

  list: publicProcedure
    .input(SessionsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.sessionsService.findMany(input);
    }),

  one: publicProcedure
    .input(SessionsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.sessionsService.findOne(input);
    }),

  renew: publicProcedure
    .input(SessionsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.sessionsService.update(input);
    }),

  delete: publicProcedure
    .input(SessionsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.sessionsService.delete(input);
    }),
});
