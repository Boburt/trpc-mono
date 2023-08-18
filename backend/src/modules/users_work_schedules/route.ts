import { publicProcedure, publicRouter } from "@backend/trpc";
import {
  users_work_schedulesCreateArgsSchema,
  users_work_schedulesDeleteArgsSchema,
  users_work_schedulesFindManyArgsSchema,
  users_work_schedulesFindUniqueArgsSchema,
  users_work_schedulesUpdateArgsSchema,
} from "@backend/lib/zod";

export const usersWorkSchedulesRouter = publicRouter({
  add: publicProcedure
    .input(users_work_schedulesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.create(input);
    }),

  list: publicProcedure
    .input(users_work_schedulesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.findMany(input);
    }),

  one: publicProcedure
    .input(users_work_schedulesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.findOne(input);
    }),

  renew: publicProcedure
    .input(users_work_schedulesUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.update(input);
    }),

  delete: publicProcedure
    .input(users_work_schedulesDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.usersWorkSchedulesService.delete(input);
    }),
});
