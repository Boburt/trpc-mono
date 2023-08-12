import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_permissionsCreateManyInputSchema } from '../inputTypeSchemas/users_permissionsCreateManyInputSchema'

export const users_permissionsCreateManyArgsSchema: z.ZodType<Prisma.users_permissionsCreateManyArgs> = z.object({
  data: z.union([ users_permissionsCreateManyInputSchema,users_permissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default users_permissionsCreateManyArgsSchema;
