import { DB } from "@backend/trpc";
import { z } from "zod";
import { Prisma, roles } from "@prisma/client";
import { rolesCreateInput, rolesFindManyZod } from "./dto/roles.dto";
import {
  rolesAggregateArgsSchema,
  rolesFindManyArgsSchema,
  rolesFindUniqueArgsSchema,
} from "@backend/lib/zod";

export class RolesService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.rolesCreateArgs): Promise<roles> {
    return await this.prisma.roles.create(input);
  }

  async findMany(
    input: z.infer<typeof rolesFindManyArgsSchema>
  ): Promise<roles[]> {
    const [roles] = await this.prisma.roles.paginate({}).withPages({
      limit: input.take ?? 20,
    });
    return roles;
  }

  async findOne(
    input: z.infer<typeof rolesFindUniqueArgsSchema>
  ): Promise<roles | null> {
    const role = await this.prisma.roles.findUnique(input);

    return role;
  }

  async update(input: Prisma.rolesUpdateArgs): Promise<roles | null> {
    return await this.prisma.roles.update(input);
  }

  async delete(input: Prisma.rolesDeleteArgs): Promise<roles | null> {
    return await this.prisma.roles.delete(input);
  }
}
