import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsWhereInputSchema } from '../inputTypeSchemas/permissionsWhereInputSchema'

export const permissionsDeleteManyArgsSchema: z.ZodType<Prisma.permissionsDeleteManyArgs> = z.object({
  where: permissionsWhereInputSchema.optional(),
}).strict()

export default permissionsDeleteManyArgsSchema;
