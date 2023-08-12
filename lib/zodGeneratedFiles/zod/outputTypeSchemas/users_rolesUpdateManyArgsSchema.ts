import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_rolesUpdateManyMutationInputSchema } from '../inputTypeSchemas/users_rolesUpdateManyMutationInputSchema'
import { users_rolesUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/users_rolesUncheckedUpdateManyInputSchema'
import { users_rolesWhereInputSchema } from '../inputTypeSchemas/users_rolesWhereInputSchema'

export const users_rolesUpdateManyArgsSchema: z.ZodType<Prisma.users_rolesUpdateManyArgs> = z.object({
  data: z.union([ users_rolesUpdateManyMutationInputSchema,users_rolesUncheckedUpdateManyInputSchema ]),
  where: users_rolesWhereInputSchema.optional(),
}).strict()

export default users_rolesUpdateManyArgsSchema;
