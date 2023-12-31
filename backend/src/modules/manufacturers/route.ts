import {
  ManufacturersCreateArgsSchema,
  ManufacturersFindManyArgsSchema,
  ManufacturersFindUniqueArgsSchema,
  ManufacturersUpdateArgsSchema,
} from "@backend/lib/zod";
import {
  checkPermission,
  checkUser,
  publicProcedure,
  publicRouter,
} from "@backend/trpc";
import { ManufacturersCreateArgsSchemaWithAsset } from "./dto/create.dto";
import {
  ManufacturersWithImagesFindManyArgsSchema,
  manufacturerReviewsCountArgsSchema,
  manufacturerReviewsPaginatedArgsSchema,
  manufacturersFacetsSchema,
} from "./dto/list.dto";
import {
  ManufacturerAddReviewArgsSchema,
  ManufacturersFindUniqueWithImageArgsSchema,
} from "./dto/one.dto";

export const manufacturersRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "manufacturers.add",
    })
    .use(checkPermission)
    .input(ManufacturersCreateArgsSchemaWithAsset)
    .mutation(({ input, ctx }) => {
      return ctx.manufacturersService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "manufacturers.list",
    })
    .use(checkPermission)
    .input(ManufacturersWithImagesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "manufacturers.one",
    })
    .use(checkPermission)
    .input(ManufacturersFindUniqueWithImageArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "manufacturers.edit",
    })
    .use(checkPermission)
    .input(ManufacturersUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "manufacturers.delete",
    })
    .use(checkPermission)
    .input(ManufacturersFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersService.delete(input);
    }),

  publicList: publicProcedure
    .input(ManufacturersWithImagesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersService.findManyWithFacet(input);
    }),
  publicOne: publicProcedure
    .input(ManufacturersFindUniqueWithImageArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersService.findOne(input);
    }),

  getFacetFilter: publicProcedure
    .input(manufacturersFacetsSchema)
    .query(({ input, ctx }) => {
      console.log("facets input", input);
      return ctx.manufacturersService.getFacetFilter(input);
    }),

  addReview: publicProcedure
    .use(checkUser)
    .input(ManufacturerAddReviewArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersService.addReview(input, ctx.user!);
    }),

  getReviewsCount: publicProcedure
    .input(manufacturerReviewsCountArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.manufacturersService.getReviewsCount(input);
    }),

  getRatingsPercentage: publicProcedure
    .input(manufacturerReviewsCountArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.manufacturersService.getRatingsPercentage(input);
    }),

  getReviews: publicProcedure
    .input(manufacturerReviewsPaginatedArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.manufacturersService.getReviews(input);
    }),
});
