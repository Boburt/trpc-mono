import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  TimesheetCreateArgsSchema,
  TimesheetDeleteArgsSchema,
  TimesheetFindManyArgsSchema,
  TimesheetFindUniqueArgsSchema,
  TimesheetUpdateArgsSchema,
} from "@backend/lib/zod";

export const timesheetRouter = publicRouter({
  add: publicProcedure
    .input(TimesheetCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.timesheetService.create(input);
    }),

  list: publicProcedure
    .input(TimesheetFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.timesheetService.findMany(input);
    }),

  one: publicProcedure
    .input(TimesheetFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.timesheetService.findOne(input);
    }),

  renew: publicProcedure
    .input(TimesheetUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.timesheetService.update(input);
    }),

  delete: publicProcedure
    .input(TimesheetDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.timesheetService.delete(input);
    }),
});
