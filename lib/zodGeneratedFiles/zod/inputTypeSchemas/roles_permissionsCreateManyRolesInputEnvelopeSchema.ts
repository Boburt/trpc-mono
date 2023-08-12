import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateManyRolesInputSchema } from './roles_permissionsCreateManyRolesInputSchema';

export const roles_permissionsCreateManyRolesInputEnvelopeSchema: z.ZodType<Prisma.roles_permissionsCreateManyRolesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => roles_permissionsCreateManyRolesInputSchema),z.lazy(() => roles_permissionsCreateManyRolesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default roles_permissionsCreateManyRolesInputEnvelopeSchema;
