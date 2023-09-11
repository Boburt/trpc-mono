import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";
import {
  ManufacturersPropertiesCategoriesCreateArgsSchema,
  ManufacturersPropertiesCategoriesFindManyArgsSchema,
  ManufacturersPropertiesCategoriesFindUniqueArgsSchema,
  ManufacturersPropertiesCategoriesUpdateArgsSchema,
} from "@backend/lib/zod";

export const manufacturersPropertiesCategoriesRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "manufacturers_properties_categories.add",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesCategoriesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.manufacturersPropertiesCategoriesService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "manufacturers_properties_categories.list",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesCategoriesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersPropertiesCategoriesService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "manufacturers_properties_categories.one",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesCategoriesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersPropertiesCategoriesService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "manufacturers_properties_categories.edit",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesCategoriesUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersPropertiesCategoriesService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "manufacturers_properties_categories.delete",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesCategoriesFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersPropertiesCategoriesService.delete(input);
    }),

  cachedManufacturerPropertiesCategories: publicProcedure
    .meta({
      permission: "manufacturers_properties_categories.list",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesCategoriesFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.manufacturersPropertiesCategoriesService.cachedManufacturersPropertiesCategories(
        input
      );
    }),
});
