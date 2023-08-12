import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema';

export const users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema: z.ZodType<Prisma.users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema;
