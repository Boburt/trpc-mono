import {
  OrganizationCreateArgsSchema,
  OrganizationUpdateArgsSchema,
  OrganizationFindUniqueArgsSchema,
  OrganizationFindManyArgsSchema,
  OrganizationDeleteArgsSchema,
} from "@backend/lib/zod";
import { publicProcedure, publicRouter } from "@backend/trpc";

export const organizationRouter = publicRouter({
  add: publicProcedure
    .input(OrganizationCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.organizationService.create(input);
    }),

  list: publicProcedure
    .input(OrganizationFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.organizationService.findMany(input);
    }),

  one: publicProcedure
    .input(OrganizationFindUniqueArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.organizationService.findOne(input);
    }),

  renew: publicProcedure
    .input(OrganizationUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.organizationService.update(input);
    }),

  delete: publicProcedure
    .input(OrganizationDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.organizationService.delete(input);
    }),

  cachedOrganizations: publicProcedure
    .input(OrganizationFindManyArgsSchema)
    .query(({ input, ctx }) => {
      return ctx.organizationService.cachedOrginization(input);
    }),
});
