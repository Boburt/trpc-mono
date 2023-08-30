import {
  ManufacturersCreateArgsSchema,
  ManufacturersFindManyArgsSchema,
  ManufacturersFindUniqueArgsSchema,
  ManufacturersUpdateArgsSchema,
} from "@backend/lib/zod";
import { checkPermission, publicProcedure, publicRouter } from "@backend/trpc";

export const manufacturersRouter = publicRouter({
  add: publicProcedure
    .meta({
      permission: "manufacturers.add",
    })
    .use(checkPermission)
    .input(ManufacturersCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.manufacturersService.create(input);
    }),

  list: publicProcedure
    .meta({
      permission: "manufacturers.list",
    })
    .use(checkPermission)
    .input(ManufacturersFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.manufacturersService.findMany(input);
    }),

  one: publicProcedure
    .meta({
      permission: "manufacturers.one",
    })
    .use(checkPermission)
    .input(ManufacturersFindUniqueArgsSchema)
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
});
