import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { roles_permissionsCreateManyInputSchema } from '../inputTypeSchemas/roles_permissionsCreateManyInputSchema'

export const roles_permissionsCreateManyArgsSchema: z.ZodType<Prisma.roles_permissionsCreateManyArgs> = z.object({
  data: z.union([ roles_permissionsCreateManyInputSchema,roles_permissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default roles_permissionsCreateManyArgsSchema;
