import { publicRouter, publicProcedure } from "@backend/trpc";
import {
  terminalsCreateArgsSchema,
  terminalsDeleteArgsSchema,
  terminalsFindManyArgsSchema,
  terminalsFindUniqueArgsSchema,
  terminalsUpdateArgsSchema,
} from "@backend/lib/zod";

export const terminalsRouter = publicRouter({
  add: publicProcedure
    .input(terminalsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.terminalsService.create(input);
    }),

  list: publicProcedure
    .input(terminalsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.terminalsService.findMany(input);
    }),

  one: publicProcedure
    .input(terminalsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.terminalsService.findOne(input);
    }),

  update: publicProcedure
    .input(terminalsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.terminalsService.update(input);
    }),

  delete: publicProcedure
    .input(terminalsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.terminalsService.delete(input);
    }),
});
