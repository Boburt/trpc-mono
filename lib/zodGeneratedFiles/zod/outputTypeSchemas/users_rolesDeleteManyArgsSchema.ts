import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_rolesWhereInputSchema } from '../inputTypeSchemas/users_rolesWhereInputSchema'

export const users_rolesDeleteManyArgsSchema: z.ZodType<Prisma.users_rolesDeleteManyArgs> = z.object({
  where: users_rolesWhereInputSchema.optional(),
}).strict()

export default users_rolesDeleteManyArgsSchema;
