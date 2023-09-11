import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";
import {
  ManufacturersPropertiesCreateArgsSchema,
  ManufacturersPropertiesFindManyArgsSchema,
  ManufacturersPropertiesFindUniqueArgsSchema,
  ManufacturersPropertiesUpdateArgsSchema,
} from "@backend/lib/zod";

export const manufacturersPropertiesRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "manufacturers_properties.add",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.manufacturersPropertiesService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "manufacturers_properties.list",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersPropertiesService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "manufacturers_properties.one",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersPropertiesService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "manufacturers_properties.edit",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersPropertiesService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "manufacturers_properties.delete",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.manufacturersPropertiesService.delete(input);
    }),

  cachedManufacturerProperties: publicProcedure
    .meta({
      permission: "manufacturers_properties.list",
    })
    .use(checkPermission)
    .input(ManufacturersPropertiesFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.manufacturersPropertiesService.cachedManufacturersProperties(
        input
      );
    }),
});
