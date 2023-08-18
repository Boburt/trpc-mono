import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  work_schedules,
  work_schedulesFindManyArgsSchema,
  work_schedulesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { CacheControlService } from "../cache_control/service";
import { PaginationType } from "@backend/lib/pagination_interface";

export class WorkSchedulesService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(
    input: Prisma.work_schedulesCreateArgs
  ): Promise<work_schedules> {
    return await this.prisma.work_schedules.create(input);
  }

  async findMany(
    input: z.infer<typeof work_schedulesFindManyArgsSchema>
  ): Promise<PaginationType<work_schedules>> {
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
    input: z.infer<typeof work_schedulesFindUniqueArgsSchema>
  ): Promise<work_schedules | null> {
    return await this.prisma.work_schedules.findUnique(input);
  }

  async update(
    input: Prisma.work_schedulesUpdateArgs
  ): Promise<work_schedules> {
    const res = await this.prisma.work_schedules.update(input);
    await this.cacheControl.chacheWorkSchedules();
    return res;
  }

  async delete(input: Prisma.work_schedulesDeleteArgs) {
    const res = await this.prisma.work_schedules.delete(input);
    await this.cacheControl.chacheWorkSchedules();
    return res;
  }

  async cachedWorkSchedules(
    input: z.infer<typeof work_schedulesFindManyArgsSchema>
  ): Promise<work_schedules[]> {
    return await this.cacheControl.getCachedWorkSchedules(input);
  }
}
