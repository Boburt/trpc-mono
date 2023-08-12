import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_permissionsWhereInputSchema } from '../inputTypeSchemas/users_permissionsWhereInputSchema'

export const users_permissionsDeleteManyArgsSchema: z.ZodType<Prisma.users_permissionsDeleteManyArgs> = z.object({
  where: users_permissionsWhereInputSchema.optional(),
}).strict()

export default users_permissionsDeleteManyArgsSchema;
