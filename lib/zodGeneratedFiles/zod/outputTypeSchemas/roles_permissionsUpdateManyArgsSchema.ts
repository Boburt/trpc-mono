import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { roles_permissionsUpdateManyMutationInputSchema } from '../inputTypeSchemas/roles_permissionsUpdateManyMutationInputSchema'
import { roles_permissionsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/roles_permissionsUncheckedUpdateManyInputSchema'
import { roles_permissionsWhereInputSchema } from '../inputTypeSchemas/roles_permissionsWhereInputSchema'

export const roles_permissionsUpdateManyArgsSchema: z.ZodType<Prisma.roles_permissionsUpdateManyArgs> = z.object({
  data: z.union([ roles_permissionsUpdateManyMutationInputSchema,roles_permissionsUncheckedUpdateManyInputSchema ]),
  where: roles_permissionsWhereInputSchema.optional(),
}).strict()

export default roles_permissionsUpdateManyArgsSchema;
