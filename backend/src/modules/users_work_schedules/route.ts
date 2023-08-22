import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  Users_work_schedulesCreateArgsSchema,
  Users_work_schedulesDeleteArgsSchema,
  Users_work_schedulesFindManyArgsSchema,
  Users_work_schedulesFindUniqueArgsSchema,
  Users_work_schedulesUpdateArgsSchema,
} from "@backend/lib/zod";

export const usersWorkSchedulesRouter = publicRouter({
  add: publicProcedure
    .input(Users_work_schedulesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.create(input);
    }),

  list: publicProcedure
    .input(Users_work_schedulesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.findMany(input);
    }),

  one: publicProcedure
    .input(Users_work_schedulesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.findOne(input);
    }),

  renew: publicProcedure
    .input(Users_work_schedulesUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.update(input);
    }),

  delete: publicProcedure
    .input(Users_work_schedulesDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.delete(input);
    }),
});
