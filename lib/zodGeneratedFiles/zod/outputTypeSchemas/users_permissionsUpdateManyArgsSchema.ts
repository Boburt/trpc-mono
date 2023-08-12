import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_permissionsUpdateManyMutationInputSchema } from '../inputTypeSchemas/users_permissionsUpdateManyMutationInputSchema'
import { users_permissionsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/users_permissionsUncheckedUpdateManyInputSchema'
import { users_permissionsWhereInputSchema } from '../inputTypeSchemas/users_permissionsWhereInputSchema'

export const users_permissionsUpdateManyArgsSchema: z.ZodType<Prisma.users_permissionsUpdateManyArgs> = z.object({
  data: z.union([ users_permissionsUpdateManyMutationInputSchema,users_permissionsUncheckedUpdateManyInputSchema ]),
  where: users_permissionsWhereInputSchema.optional(),
}).strict()

export default users_permissionsUpdateManyArgsSchema;
