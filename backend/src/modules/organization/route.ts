import {
  organizationCreateArgsSchema,
  organizationUpdateArgsSchema,
  organizationFindUniqueArgsSchema,
  organizationFindManyArgsSchema,
  organizationDeleteArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const organizationRouter = publicRouter({
  add: publicProcedure
    .input(organizationCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.organizationService.create(input);
    }),

  list: publicProcedure
    .input(organizationFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.organizationService.findMany(input);
    }),

  one: publicProcedure
    .input(organizationFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.organizationService.findOne(input);
    }),

  renew: publicProcedure
    .input(organizationUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.organizationService.update(input);
    }),

  delete: publicProcedure
    .input(organizationDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.organizationService.delete(input);
    }),
});
