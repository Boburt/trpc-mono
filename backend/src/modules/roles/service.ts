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
import { CacheControlService } from "../cache_control/service";

export class RolesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(input: Prisma.rolesCreateArgs): Promise<roles> {
    const roles = await this.prisma.roles.create(input);
    await this.cacheControl.cacheRoles();
    return roles;
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

  async getCachedRoles(
    input: z.infer<typeof rolesFindManyArgsSchema>
  ): Promise<roles[]> {
    return await this.cacheControl.getCachedRoles(input);
  }
}
