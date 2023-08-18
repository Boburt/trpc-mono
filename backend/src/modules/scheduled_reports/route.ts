import {
  scheduled_reportsCreateArgsSchema,
  scheduled_reportsDeleteArgsSchema,
  scheduled_reportsFindUniqueArgsSchema,
  scheduled_reportsUpdateArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const scheduledReportsRouter = publicRouter({
  add: publicProcedure
    .input(scheduled_reportsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.scheduledReportsService.create(input);
    }),

  list: publicProcedure
    .input(scheduled_reportsCreateArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.scheduledReportsService.findMany(input);
    }),

  one: publicProcedure
    .input(scheduled_reportsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.scheduledReportsService.findOne(input);
    }),

  renew: publicProcedure
    .input(scheduled_reportsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.scheduledReportsService.update(input);
    }),

  delete: publicProcedure
    .input(scheduled_reportsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.scheduledReportsService.delete(input);
    }),
});
