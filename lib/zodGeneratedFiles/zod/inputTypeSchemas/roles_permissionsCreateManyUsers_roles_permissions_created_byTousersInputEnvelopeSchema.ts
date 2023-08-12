import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema';

export const roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema;
