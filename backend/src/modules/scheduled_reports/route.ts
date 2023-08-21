import {
  Scheduled_reportsCreateArgsSchema,
  Scheduled_reportsDeleteArgsSchema,
  Scheduled_reportsFindUniqueArgsSchema,
  Scheduled_reportsUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const scheduledReportsRouter = publicRouter({
  add: publicProcedure
    .input(Scheduled_reportsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.scheduledReportsService.create(input);
    }),

  list: publicProcedure
    .input(Scheduled_reportsCreateArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.scheduledReportsService.findMany(input);
    }),

  one: publicProcedure
    .input(Scheduled_reportsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.scheduledReportsService.findOne(input);
    }),

  renew: publicProcedure
    .input(Scheduled_reportsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.scheduledReportsService.update(input);
    }),

  delete: publicProcedure
    .input(Scheduled_reportsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.scheduledReportsService.delete(input);
    }),
});
