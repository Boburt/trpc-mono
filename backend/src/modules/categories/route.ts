import {
  CategoriesCreateArgsSchema,
  CategoriesFindManyArgsSchema,
  CategoriesFindUniqueArgsSchema,
  CategoriesUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const categoriesRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "categories.add",
    })
    .use(checkPermission)
    .input(CategoriesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.categoriesService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "categories.list",
    })
    .use(checkPermission)
    .input(CategoriesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.categoriesService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "categories.one",
    })
    .use(checkPermission)
    .input(CategoriesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.categoriesService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "categories.edit",
    })
    .use(checkPermission)
    .input(CategoriesUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.categoriesService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "categories.delete",
    })
    .use(checkPermission)
    .input(CategoriesFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.categoriesService.delete(input);
    }),

  cachedLangs: publicProcedure
    .input(CategoriesFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.categoriesService.cachedLangs(input);
    }),
});
