import {
  CitiesCreateArgsSchema,
  CitiesFindManyArgsSchema,
  CitiesFindUniqueArgsSchema,
  CitiesUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const citiesRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "cities.add",
    })
    .use(checkPermission)
    .input(CitiesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.citiesService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "cities.list",
    })
    .use(checkPermission)
    .input(CitiesFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.citiesService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "cities.one",
    })
    .use(checkPermission)
    .input(CitiesFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.citiesService.findOne(input);
    }),

  renew: publicProcedure
    .meta({
      permission: "cities.edit",
    })
    .use(checkPermission)
    .input(CitiesUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.citiesService.update(input);
    }),

  delete: publicProcedure
    .meta({
      permission: "cities.delete",
    })
    .use(checkPermission)
    .input(CitiesFindUniqueArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.citiesService.delete(input);
    }),

  cachedCities: publicProcedure
    .input(CitiesFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.citiesService.cachedCities(input);
    }),
});
