import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateManyRolesInputSchema } from './users_rolesCreateManyRolesInputSchema';

export const users_rolesCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.users_rolesCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_rolesCreateManyRolesInputSchema),z.lazy(() => users_rolesCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default users_rolesCreateManyRolesInputEnvelopeSchema;
