import {
  users_terminalsCreateArgsSchema,
  users_terminalsDeleteArgsSchema,
  users_terminalsFindManyArgsSchema,
  users_terminalsFindUniqueArgsSchema,
  users_terminalsUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const usersTerminalsRouter = publicRouter({
  add: publicProcedure
    .input(users_terminalsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersTerminalsService.create(input);
    }),

  list: publicProcedure
    .input(users_terminalsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersTerminalsService.findMany(input);
    }),

  one: publicProcedure
    .input(users_terminalsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersTerminalsService.findUnique(input);
    }),

  renew: publicProcedure
    .input(users_terminalsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersTerminalsService.update(input);
    }),

  delete: publicProcedure
    .input(users_terminalsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersTerminalsService.delete(input);
    }),
});
