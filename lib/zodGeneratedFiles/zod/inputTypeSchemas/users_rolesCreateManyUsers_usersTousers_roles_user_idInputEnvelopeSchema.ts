import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema } from './users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema';

export const users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema: z.ZodType<Prisma.users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema;
