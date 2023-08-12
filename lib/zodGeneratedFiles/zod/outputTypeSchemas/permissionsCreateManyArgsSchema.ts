import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsCreateManyInputSchema } from '../inputTypeSchemas/permissionsCreateManyInputSchema'

export const permissionsCreateManyArgsSchema: z.ZodType<Prisma.permissionsCreateManyArgs> = z.object({
  data: z.union([ permissionsCreateManyInputSchema,permissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default permissionsCreateManyArgsSchema;
