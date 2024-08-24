import {
  Users_terminalsCreateArgsSchema,
  Users_terminalsDeleteArgsSchema,
  Users_terminalsFindManyArgsSchema,
  Users_terminalsFindUniqueArgsSchema,
  Users_terminalsUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const usersTerminalsRouter = publicRouter({
  add: publicProcedure
    .input(Users_terminalsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersTerminalsService.create(input);
    }),

  list: publicProcedure
    .input(Users_terminalsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersTerminalsService.findMany(input);
    }),

  one: publicProcedure
    .input(Users_terminalsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersTerminalsService.findUnique(input);
    }),

  renew: publicProcedure
    .input(Users_terminalsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersTerminalsService.update(input);
    }),

  delete: publicProcedure
    .input(Users_terminalsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersTerminalsService.delete(input);
    }),
});
