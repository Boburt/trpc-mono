import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { roles_permissionsWhereInputSchema } from '../inputTypeSchemas/roles_permissionsWhereInputSchema'

export const roles_permissionsDeleteManyArgsSchema: z.ZodType<Prisma.roles_permissionsDeleteManyArgs> = z.object({
  where: roles_permissionsWhereInputSchema.optional(),
}).strict()

export default roles_permissionsDeleteManyArgsSchema;
