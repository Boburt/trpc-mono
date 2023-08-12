import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_permissionsSelectSchema } from '../inputTypeSchemas/users_permissionsSelectSchema';
import { users_permissionsIncludeSchema } from '../inputTypeSchemas/users_permissionsIncludeSchema';

export const users_permissionsArgsSchema: z.ZodType<Prisma.users_permissionsDefaultArgs> = z.object({
  select: z.lazy(() => users_permissionsSelectSchema).optional(),
  include: z.lazy(() => users_permissionsIncludeSchema).optional(),
}).strict();

export default users_permissionsArgsSchema;
