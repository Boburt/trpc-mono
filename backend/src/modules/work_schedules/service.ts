import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  Work_schedules,
  Work_schedulesFindManyArgsSchema,
  Work_schedulesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { CacheControlService } from "../cache_control/service";
import { PaginationType } from "@backend/lib/pagination_interface";
import { DB } from "@backend/db";

export class WorkSchedulesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(
    input: Prisma.Work_schedulesCreateArgs
  ): Promise<Work_schedules> {
    return await this.prisma.work_schedules.create(input);
  }

  async findMany(
    input: z.infer<typeof Work_schedulesFindManyArgsSchema>
  ): Promise<PaginationType<Work_schedules>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [work_schedules, meta] = await this.prisma.work_schedules
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: work_schedules,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof Work_schedulesFindUniqueArgsSchema>
  ): Promise<Work_schedules | null> {
    return await this.prisma.work_schedules.findUnique(input);
  }

  async update(
    input: Prisma.Work_schedulesUpdateArgs
  ): Promise<Work_schedules> {
    const res = await this.prisma.work_schedules.update(input);
    await this.cacheControl.chacheWorkSchedules();
    return res;
  }

  async delete(input: Prisma.Work_schedulesDeleteArgs) {
    const res = await this.prisma.work_schedules.delete(input);
    await this.cacheControl.chacheWorkSchedules();
    return res;
  }

  async cachedWorkSchedules(
    input: z.infer<typeof Work_schedulesFindManyArgsSchema>
  ): Promise<Work_schedules[]> {
    return await this.cacheControl.getCachedWorkSchedules(input);
  }
}
