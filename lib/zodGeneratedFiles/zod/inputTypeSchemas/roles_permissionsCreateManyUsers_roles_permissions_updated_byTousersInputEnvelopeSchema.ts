import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema';

export const roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema;
