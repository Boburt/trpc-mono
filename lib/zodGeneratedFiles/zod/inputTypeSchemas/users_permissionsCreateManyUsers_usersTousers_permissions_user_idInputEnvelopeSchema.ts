import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema';

export const users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema;
