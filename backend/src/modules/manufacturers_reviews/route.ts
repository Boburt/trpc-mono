import {
  ManufacturersReviewsFindManyArgsSchema,
  ManufacturersReviewsFindUniqueArgsSchema,
  ManufacturersReviewsUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const manufacturersReviewsRouter = publicRouter({
  list: publicProcedure
    .meta({
      permission: "manufacturers_reviews.list",
    })
    .use(checkPermission)
    .input(ManufacturersReviewsFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersReviewsService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "manufacturers_reviews.one",
    })
    .use(checkPermission)
    .input(ManufacturersReviewsFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersReviewsService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "manufacturers_reviews.edit",
    })
    .use(checkPermission)
    .input(ManufacturersReviewsUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersReviewsService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "manufacturers_reviews.delete",
    })
    .use(checkPermission)
    .input(ManufacturersReviewsFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersReviewsService.delete(input);
    }),
});
