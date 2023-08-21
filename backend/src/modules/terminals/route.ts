import { publicRouter, publicProcedure } from "@backend/trpc";
import {
  TerminalsCreateArgsSchema,
  TerminalsDeleteArgsSchema,
  TerminalsFindManyArgsSchema,
  TerminalsFindUniqueArgsSchema,
  TerminalsUpdateArgsSchema,
} from "@backend/lib/zod";

export const terminalsRouter = publicRouter({
  add: publicProcedure
    .input(TerminalsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.terminalsService.create(input);
    }),

  list: publicProcedure
    .input(TerminalsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.terminalsService.findMany(input);
    }),

  one: publicProcedure
    .input(TerminalsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.terminalsService.findOne(input);
    }),

  update: publicProcedure
    .input(TerminalsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.terminalsService.update(input);
    }),

  delete: publicProcedure
    .input(TerminalsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.terminalsService.delete(input);
    }),

  cachedTerminals: publicProcedure
    .input(TerminalsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.terminalsService.cachedTerminals(input);
    }),
});
