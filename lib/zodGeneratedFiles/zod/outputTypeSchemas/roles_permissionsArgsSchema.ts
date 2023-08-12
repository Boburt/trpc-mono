import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { roles_permissionsSelectSchema } from '../inputTypeSchemas/roles_permissionsSelectSchema';
import { roles_permissionsIncludeSchema } from '../inputTypeSchemas/roles_permissionsIncludeSchema';

export const roles_permissionsArgsSchema: z.ZodType<Prisma.roles_permissionsDefaultArgs> = z.object({
  select: z.lazy(() => roles_permissionsSelectSchema).optional(),
  include: z.lazy(() => roles_permissionsIncludeSchema).optional(),
}).strict();

export default roles_permissionsArgsSchema;
