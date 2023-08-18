import {
  users_work_schedules,
  users_work_schedulesFindManyArgsSchema,
  users_work_schedulesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { PaginationType } from "@backend/lib/pagination_interface";

export class UsersWorkSchedulesService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: Prisma.users_work_schedulesCreateArgs
  ): Promise<users_work_schedules> {
    return await this.prisma.users_work_schedules.create(input);
  }

  async findMany(
    input: z.infer<typeof users_work_schedulesFindManyArgsSchema>
  ): Promise<PaginationType<users_work_schedules>> {
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
    input: z.infer<typeof users_work_schedulesFindUniqueArgsSchema>
  ): Promise<users_work_schedules | null> {
    return await this.prisma.users_work_schedules.findUnique(input);
  }

  async update(
    input: Prisma.users_work_schedulesUpdateArgs
  ): Promise<users_work_schedules> {
    return await this.prisma.users_work_schedules.update(input);
  }

  async delete(input: Prisma.users_work_schedulesDeleteArgs) {
    return await this.prisma.users_work_schedules.delete(input);
  }
}
