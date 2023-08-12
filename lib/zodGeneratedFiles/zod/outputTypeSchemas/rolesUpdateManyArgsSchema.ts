import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { rolesUpdateManyMutationInputSchema } from '../inputTypeSchemas/rolesUpdateManyMutationInputSchema'
import { rolesUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/rolesUncheckedUpdateManyInputSchema'
import { rolesWhereInputSchema } from '../inputTypeSchemas/rolesWhereInputSchema'

export const rolesUpdateManyArgsSchema: z.ZodType<Prisma.rolesUpdateManyArgs> = z.object({
  data: z.union([ rolesUpdateManyMutationInputSchema,rolesUncheckedUpdateManyInputSchema ]),
  where: rolesWhereInputSchema.optional(),
}).strict()

export default rolesUpdateManyArgsSchema;
