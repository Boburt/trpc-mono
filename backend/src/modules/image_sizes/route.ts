import {
  ImageSizesCreateArgsSchema,
  ImageSizesFindManyArgsSchema,
  ImageSizesFindUniqueArgsSchema,
  ImageSizesUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const imageSizesRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "image_sizes.add",
    })
    .use(checkPermission)
    .input(ImageSizesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.imageSizesService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "image_sizes.list",
    })
    .use(checkPermission)
    .input(ImageSizesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.imageSizesService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "image_sizes.one",
    })
    .use(checkPermission)
    .input(ImageSizesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.imageSizesService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "image_sizes.edit",
    })
    .use(checkPermission)
    .input(ImageSizesUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.imageSizesService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "image_sizes.delete",
    })
    .use(checkPermission)
    .input(ImageSizesFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.imageSizesService.delete(input);
    }),

  cachedLangs: publicProcedure
    .meta({
      permission: "image_sizes.list",
    })
    .use(checkPermission)
    .input(ImageSizesFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.imageSizesService.cachedImageSizes(input);
    }),
});
