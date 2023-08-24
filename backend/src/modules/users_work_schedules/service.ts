import {
  Users_work_schedules,
  Users_work_schedulesFindManyArgsSchema,
  Users_work_schedulesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { DB } from "@backend/db";

export class UsersWorkSchedulesService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: Prisma.Users_work_schedulesCreateArgs
  ): Promise<Users_work_schedules> {
    return await this.prisma.users_work_schedules.create(input);
  }

  async findMany(
    input: z.infer<typeof Users_work_schedulesFindManyArgsSchema>
  ): Promise<PaginationType<Users_work_schedules>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [users_work_schedules, meta] = await this.prisma.users_work_schedules
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: users_work_schedules,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof Users_work_schedulesFindUniqueArgsSchema>
  ): Promise<Users_work_schedules | null> {
    return await this.prisma.users_work_schedules.findUnique(input);
  }

  async update(
    input: Prisma.Users_work_schedulesUpdateArgs
  ): Promise<Users_work_schedules> {
    return await this.prisma.users_work_schedules.update(input);
  }

  async delete(input: Prisma.Users_work_schedulesDeleteArgs) {
    return await this.prisma.users_work_schedules.delete(input);
  }
}
