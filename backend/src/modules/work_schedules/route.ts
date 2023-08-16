import { publicRouter, publicProcedure } from "@backend/trpc";
import {
  work_schedulesCreateArgsSchema,
  work_schedulesFindManyArgsSchema,
  work_schedulesFindUniqueArgsSchema,
  work_schedulesUpdateArgsSchema,
} from "@backend/lib/zod";

export const workSchedulesRouter = publicRouter({
  add: publicProcedure
    .input(work_schedulesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workSchedulesService.create(input);
    }),
  list: publicProcedure
    .input(work_schedulesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.workSchedulesService.findMany(input);
    }),
  one: publicProcedure
    .input(work_schedulesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.workSchedulesService.findOne(input);
    }),
  renew: publicProcedure
    .input(work_schedulesUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.workSchedulesService.update(input);
    }),
});
