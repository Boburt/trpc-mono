import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { users_rolesSelectSchema } from '../inputTypeSchemas/users_rolesSelectSchema';
import { users_rolesIncludeSchema } from '../inputTypeSchemas/users_rolesIncludeSchema';

export const users_rolesArgsSchema: z.ZodType<Prisma.users_rolesDefaultArgs> = z.object({
  select: z.lazy(() => users_rolesSelectSchema).optional(),
  include: z.lazy(() => users_rolesIncludeSchema).optional(),
}).strict();

export default users_rolesArgsSchema;
