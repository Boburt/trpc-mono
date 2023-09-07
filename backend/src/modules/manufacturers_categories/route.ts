import {
  CategoriesFindManyArgsSchema,
  ManufacturersCategoriesCreateManyArgsSchema,
  ManufacturersCategoriesFindManyArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const manufacturersCategoriesRouter = publicRouter({
  assignCategoriesToManufacturer: publicProcedure
    .meta({
      permission: "manufacturers.add",
    })
    .use(checkPermission)
    .input(ManufacturersCategoriesCreateManyArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.manufacturersCategories.assignCategoriesToManufacturer(input);
    }),

  categoriesByManufacturer: publicProcedure
    .meta({
      permission: "manufacturers.list",
    })
    .use(checkPermission)
    .input(ManufacturersCategoriesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersCategories.findMany(input);
    }),
});
