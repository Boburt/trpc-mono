import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesCreateManyInputSchema } from '../inputTypeSchemas/rolesCreateManyInputSchema'

export const rolesCreateManyArgsSchema: z.ZodType<Prisma.rolesCreateManyArgs> = z.object({
  data: z.union([ rolesCreateManyInputSchema,rolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default rolesCreateManyArgsSchema;
