import {
  organizationFindManyArgsSchema,
  organizationFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export class OrganizationService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.organizationCreateArgs) {
    return await this.prisma.organization.create(input);
  }

  async findMany(input: z.infer<typeof organizationFindManyArgsSchema>) {
    return await this.prisma.organization.paginate({}).withPages({
      limit: input.take ?? 20,
    });
  }

  async findOne(input: z.infer<typeof organizationFindUniqueArgsSchema>) {
    return await this.prisma.organization.findUnique(input);
  }

  async update(input: Prisma.organizationUpdateArgs) {
    return await this.prisma.organization.update(input);
  }
}
