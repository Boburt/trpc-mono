import { Prisma } from "@prisma/client";
import { DB } from "@backend/trpc";
import { PaginationType } from "@backend/lib/pagination_interface";
import {
  work_schedule_entries,
  work_schedule_entriesFindManyArgsSchema,
  work_schedule_entriesFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { z } from "zod";

export class WorkScheduleEntriesService {
  constructor(private readonly prisma: DB) {}

  async create(
    input: Prisma.work_schedule_entriesCreateArgs
  ): Promise<work_schedule_entries> {
    return await this.prisma.work_schedule_entries.create(input);
  }

  async findMany(
    input: z.infer<typeof work_schedule_entriesFindManyArgsSchema>
  ): Promise<PaginationType<work_schedule_entries>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [work_schedule_entries, meta] =
      await this.prisma.work_schedule_entries.paginate(input).withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: work_schedule_entries,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof work_schedule_entriesFindUniqueArgsSchema>
  ): Promise<work_schedule_entries | null> {
    return await this.prisma.work_schedule_entries.findUnique(input);
  }

  async update(
    input: Prisma.work_schedule_entriesUpdateArgs
  ): Promise<work_schedule_entries> {
    return await this.prisma.work_schedule_entries.update(input);
  }

  async delete(input: Prisma.work_schedule_entriesDeleteArgs) {
    return await this.prisma.work_schedule_entries.delete(input);
  }
}
