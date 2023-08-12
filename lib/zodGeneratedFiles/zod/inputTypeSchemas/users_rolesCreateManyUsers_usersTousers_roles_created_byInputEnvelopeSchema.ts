import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema } from './users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema';

export const users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema;
