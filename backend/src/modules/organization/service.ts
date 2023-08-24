import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  Organization,
  OrganizationFindManyArgsSchema,
  OrganizationFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { CacheControlService } from "../cache_control/service";
import { PaginationType } from "@backend/lib/pagination_interface";
import { DB } from "@backend/db";

export class OrganizationService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.OrganizationCreateArgs): Promise<Organization> {
    const organization = await this.prisma.organization.create(input);
    await this.cacheControl.cacheOrganization();
    return organization;
  }

  async findMany(
    input: z.infer<typeof OrganizationFindManyArgsSchema>
  ): Promise<PaginationType<Organization>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;

    const [organization, meta] = await this.prisma.organization
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: organization,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof OrganizationFindUniqueArgsSchema>
  ): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique(input);
    return organization;
  }

  async update(input: Prisma.OrganizationUpdateArgs): Promise<Organization> {
    const organization = await this.prisma.organization.update(input);
    await this.cacheControl.cacheOrganization();
    return organization;
  }

  async delete(input: Prisma.OrganizationDeleteArgs) {
    const organization = await this.prisma.organization.delete(input);
    await this.cacheControl.cacheOrganization();
    return organization;
  }

  async cachedOrginization(
    input: z.infer<typeof OrganizationFindManyArgsSchema>
  ): Promise<Organization[]> {
    return await this.cacheControl.getCachedOrganization(input);
  }
}
