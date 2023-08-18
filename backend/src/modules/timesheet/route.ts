import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  timesheetCreateArgsSchema,
  timesheetDeleteArgsSchema,
  timesheetFindManyArgsSchema,
  timesheetFindUniqueArgsSchema,
  timesheetUpdateArgsSchema,
} from "@backend/lib/zod";

export const timesheetRouter = publicRouter({
  add: publicProcedure
    .input(timesheetCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.timesheetService.create(input);
    }),

  list: publicProcedure
    .input(timesheetFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.timesheetService.findMany(input);
    }),

  one: publicProcedure
    .input(timesheetFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.timesheetService.findOne(input);
    }),

  renew: publicProcedure
    .input(timesheetUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.timesheetService.update(input);
    }),

  delete: publicProcedure
    .input(timesheetDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.timesheetService.delete(input);
    }),
});
