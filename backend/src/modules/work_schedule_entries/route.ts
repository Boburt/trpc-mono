import {
  work_schedule_entriesCreateArgsSchema,
  work_schedule_entriesFindManyArgsSchema,
  work_schedule_entriesFindUniqueArgsSchema,
  work_schedule_entriesUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const workScheduleEntriesRouter = publicRouter({
  add: publicProcedure
    .input(work_schedule_entriesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workScheduleEntriesService.create(input);
    }),

  list: publicProcedure
    .input(work_schedule_entriesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.workScheduleEntriesService.findMany(input);
    }),

  one: publicProcedure
    .input(work_schedule_entriesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.workScheduleEntriesService.findOne(input);
    }),

  renew: publicProcedure
    .input(work_schedule_entriesUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workScheduleEntriesService.update(input);
    }),
});
