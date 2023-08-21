import { DB } from "@backend/trpc";
import { CacheControlService } from "../cache_control/service";
import { Prisma } from "@prisma/client";
import {
  Scheduled_reports,
  Scheduled_reportsFindManyArgsSchema,
  Scheduled_reportsFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { z } from "zod";
import { PaginationType } from "@backend/lib/pagination_interface";

export class ScheduledReportsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async create(
    input: Prisma.Scheduled_reportsCreateArgs
  ): Promise<Scheduled_reports> {
    const res = await this.prisma.scheduled_reports.create(input);
    await this.cacheControl.cacheScheduledReports();
    return res;
  }

  async findMany(
    input: z.infer<typeof Scheduled_reportsFindManyArgsSchema>
  ): Promise<PaginationType<Scheduled_reports>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [scheduled_reports, meta] = await this.prisma.scheduled_reports
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: scheduled_reports,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof Scheduled_reportsFindUniqueArgsSchema>
  ): Promise<Scheduled_reports | null> {
    return await this.prisma.scheduled_reports.findUnique(input);
  }

  async update(
    input: Prisma.Scheduled_reportsUpdateArgs
  ): Promise<Scheduled_reports> {
    const res = await this.prisma.scheduled_reports.update(input);
    await this.cacheControl.cacheScheduledReports();
    return res;
  }

  async delete(input: Prisma.Scheduled_reportsDeleteArgs) {
    const res = await this.prisma.scheduled_reports.delete(input);
    await this.cacheControl.cacheScheduledReports();
    return res;
  }

  async cachedScheduledReports(
    input: z.infer<typeof Scheduled_reportsFindManyArgsSchema>
  ): Promise<Scheduled_reports[]> {
    return await this.cacheControl.getCachedScheduledReports(input);
  }
}
