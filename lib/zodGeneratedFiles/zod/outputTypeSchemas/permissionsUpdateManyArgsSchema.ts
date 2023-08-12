import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsUpdateManyMutationInputSchema } from '../inputTypeSchemas/permissionsUpdateManyMutationInputSchema'
import { permissionsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/permissionsUncheckedUpdateManyInputSchema'
import { permissionsWhereInputSchema } from '../inputTypeSchemas/permissionsWhereInputSchema'

export const permissionsUpdateManyArgsSchema: z.ZodType<Prisma.permissionsUpdateManyArgs> = z.object({
  data: z.union([ permissionsUpdateManyMutationInputSchema,permissionsUncheckedUpdateManyInputSchema ]),
  where: permissionsWhereInputSchema.optional(),
}).strict()

export default permissionsUpdateManyArgsSchema;
