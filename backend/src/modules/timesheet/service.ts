import { PaginationType } from "@backend/lib/pagination_interface";
import {
  timesheet,
  timesheetFindManyArgsSchema,
  timesheetFindUniqueArgsSchema,
} from "@backend/lib/zod";
import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export class TimesheetService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.timesheetCreateArgs): Promise<timesheet> {
    return await this.prisma.timesheet.create(input);
  }

  async findMany(
    input: z.infer<typeof timesheetFindManyArgsSchema>
  ): Promise<PaginationType<timesheet>> {
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
    input: z.infer<typeof timesheetFindUniqueArgsSchema>
  ): Promise<timesheet | null> {
    return await this.prisma.timesheet.findUnique(input);
  }

  async update(input: Prisma.timesheetUpdateArgs): Promise<timesheet> {
    return await this.prisma.timesheet.update(input);
  }

  async delete(input: Prisma.timesheetDeleteArgs) {
    return await this.prisma.timesheet.delete(input);
  }
}
