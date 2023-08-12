import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersWhereInputSchema } from '../inputTypeSchemas/usersWhereInputSchema'

export const usersDeleteManyArgsSchema: z.ZodType<Prisma.usersDeleteManyArgs> = z.object({
  where: usersWhereInputSchema.optional(),
}).strict()

export default usersDeleteManyArgsSchema;
