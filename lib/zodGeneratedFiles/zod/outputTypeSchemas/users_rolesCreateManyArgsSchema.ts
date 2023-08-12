import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_rolesCreateManyInputSchema } from '../inputTypeSchemas/users_rolesCreateManyInputSchema'

export const users_rolesCreateManyArgsSchema: z.ZodType<Prisma.users_rolesCreateManyArgs> = z.object({
  data: z.union([ users_rolesCreateManyInputSchema,users_rolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default users_rolesCreateManyArgsSchema;
