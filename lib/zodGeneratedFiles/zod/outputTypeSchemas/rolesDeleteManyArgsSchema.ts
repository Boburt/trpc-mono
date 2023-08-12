import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesWhereInputSchema } from '../inputTypeSchemas/rolesWhereInputSchema'

export const rolesDeleteManyArgsSchema: z.ZodType<Prisma.rolesDeleteManyArgs> = z.object({
  where: rolesWhereInputSchema.optional(),
}).strict()

export default rolesDeleteManyArgsSchema;
