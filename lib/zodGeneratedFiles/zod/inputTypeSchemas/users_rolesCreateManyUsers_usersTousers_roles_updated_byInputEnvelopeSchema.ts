import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema } from './users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema';

export const users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_updated_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default users_rolesCreateManyUsers_usersTousers_roles_updated_byInputEnvelopeSchema;
