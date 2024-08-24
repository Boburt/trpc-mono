import {
  Work_schedule_entriesCreateArgsSchema,
  Work_schedule_entriesFindManyArgsSchema,
  Work_schedule_entriesFindUniqueArgsSchema,
  Work_schedule_entriesUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const workScheduleEntriesRouter = publicRouter({
  add: publicProcedure
    .input(Work_schedule_entriesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workScheduleEntriesService.create(input);
    }),

  list: publicProcedure
    .input(Work_schedule_entriesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.workScheduleEntriesService.findMany(input);
    }),

  one: publicProcedure
    .input(Work_schedule_entriesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.workScheduleEntriesService.findOne(input);
    }),

  renew: publicProcedure
    .input(Work_schedule_entriesUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workScheduleEntriesService.update(input);
    }),
});
