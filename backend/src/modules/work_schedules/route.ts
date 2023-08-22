import { publicRouter, publicProcedure } from "@backend/trpc";
import {
  Work_schedulesCreateArgsSchema,
  Work_schedulesDeleteArgsSchema,
  Work_schedulesFindManyArgsSchema,
  Work_schedulesFindUniqueArgsSchema,
  Work_schedulesUpdateArgsSchema,
} from "@backend/lib/zod";

export const workSchedulesRouter = publicRouter({
  add: publicProcedure
    .input(Work_schedulesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workSchedulesService.create(input);
    }),
  list: publicProcedure
    .input(Work_schedulesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.workSchedulesService.findMany(input);
    }),
  one: publicProcedure
    .input(Work_schedulesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.workSchedulesService.findOne(input);
    }),
  renew: publicProcedure
    .input(Work_schedulesUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workSchedulesService.update(input);
    }),

  delete: publicProcedure
    .input(Work_schedulesDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workSchedulesService.delete(input);
    }),

  cachedWorkSchedules: publicProcedure
    .input(Work_schedulesFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.workSchedulesService.cachedWorkSchedules(input);
    }),
});
