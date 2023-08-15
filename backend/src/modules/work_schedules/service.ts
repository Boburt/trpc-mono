import { DB } from "@backend/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  work_schedulesFindManyArgsSchema,
  work_schedulesFindUniqueArgsSchema,
} from "@backend/lib/zod";

export class WorkSchedulesService {
  constructor(private readonly prisma: DB) {}

  async create(input: Prisma.work_schedulesCreateArgs) {
    return await this.prisma.work_schedules.create(input);
  }

  async findMany(input: z.infer<typeof work_schedulesFindManyArgsSchema>) {
    return await this.prisma.work_schedules.paginate({}).withPages({
      limit: input.take ?? 20,
    });
  }

  async findOne(input: z.infer<typeof work_schedulesFindUniqueArgsSchema>) {
    return await this.prisma.work_schedules.findUnique(input);
  }

  async update(input: Prisma.work_schedulesUpdateArgs) {
    return await this.prisma.work_schedules.update(input);
  }
}
