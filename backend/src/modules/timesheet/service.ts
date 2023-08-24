import { DB } from "@backend/db";
import { PaginationType } from "@backend/lib/pagination_interface";
import {
  Timesheet,
  TimesheetFindManyArgsSchema,
  TimesheetFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export class TimesheetService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.TimesheetCreateArgs): Promise<Timesheet> {
    return await this.prisma.timesheet.create(input);
  }

  async findMany(
    input: z.infer<typeof TimesheetFindManyArgsSchema>
  ): Promise<PaginationType<Timesheet>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;

    const [timesheet, meta] = await this.prisma.timesheet
      .paginate(input)
      .withPages({
        limit: take,
        page: skip,
        includePageCount: true,
      });
    return {
      items: timesheet,
      meta,
    };
  }

  async findOne(
    input: z.infer<typeof TimesheetFindUniqueArgsSchema>
  ): Promise<Timesheet | null> {
    return await this.prisma.timesheet.findUnique(input);
  }

  async update(input: Prisma.TimesheetUpdateArgs): Promise<Timesheet> {
    return await this.prisma.timesheet.update(input);
  }

  async delete(input: Prisma.TimesheetDeleteArgs) {
    return await this.prisma.timesheet.delete(input);
  }
}
