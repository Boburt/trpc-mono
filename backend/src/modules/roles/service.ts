import { DB } from "@backend/trpc";
import { z } from "zod";
import { roles } from "@prisma/client";
import { rolesCreateInput, rolesFindManyZod } from "./dto/roles.dto";

export class RolesService {
  constructor(private readonly prisma: DB) {}

  async create(input: rolesCreateInput): Promise<roles> {
    return await this.prisma.roles.create({
      data: input,
    });
  }

  async findMany(input: z.infer<typeof rolesFindManyZod>): Promise<roles[]> {
    const [roles] = await this.prisma.roles.paginate({}).withPages({
      limit: input.take ?? 20,
    });
    return roles;
  }

  async findOne(id: string): Promise<roles | null> {
    const role = await this.prisma.roles.findUnique({
      where: {
        id: id,
      },
    });

    if (!role) {
      throw new Error(`Role with id ${id} not found.`);
    }

    return role;
  }

  async update(id: string, input: rolesCreateInput): Promise<roles | null> {
    return await this.prisma.roles.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: string, input: rolesCreateInput) {
    return `This action removes a #${id} role`;
  }
}
