import { DB } from "@backend/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { rolesCreateInput, rolesFindManyZod } from "./dto/roles.dto";
import {
  rolesFindManyArgsSchema,
  rolesFindUniqueArgsSchema,
  roles,
} from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";

export class RolesService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.rolesCreateArgs): Promise<roles> {
    return await this.prisma.roles.create(input);
  }

  async findMany(
    input: z.infer<typeof rolesFindManyArgsSchema>
  ): Promise<PaginationType<roles>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [roles, meta] = await this.prisma.roles.paginate(input).withPages({
      limit: take,
      page: skip,
      includePageCount: true,
    });

    return {
      items: roles,
      meta,
    };
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
