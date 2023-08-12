import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersUpdateManyMutationInputSchema } from '../inputTypeSchemas/usersUpdateManyMutationInputSchema'
import { usersUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/usersUncheckedUpdateManyInputSchema'
import { usersWhereInputSchema } from '../inputTypeSchemas/usersWhereInputSchema'

export const usersUpdateManyArgsSchema: z.ZodType<Prisma.usersUpdateManyArgs> = z.object({
  data: z.union([ usersUpdateManyMutationInputSchema,usersUncheckedUpdateManyInputSchema ]),
  where: usersWhereInputSchema.optional(),
}).strict()

export default usersUpdateManyArgsSchema;
