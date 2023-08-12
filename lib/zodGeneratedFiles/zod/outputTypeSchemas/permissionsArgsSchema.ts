import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsSelectSchema } from '../inputTypeSchemas/permissionsSelectSchema';
import { permissionsIncludeSchema } from '../inputTypeSchemas/permissionsIncludeSchema';

export const permissionsArgsSchema: z.ZodType<Prisma.permissionsDefaultArgs> = z.object({
  select: z.lazy(() => permissionsSelectSchema).optional(),
  include: z.lazy(() => permissionsIncludeSchema).optional(),
}).strict();

export default permissionsArgsSchema;
