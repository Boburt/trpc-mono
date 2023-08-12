import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateManyPermissionsInputSchema } from './roles_permissionsCreateManyPermissionsInputSchema';

export const roles_permissionsCreateManyPermissionsInputEnvelopeSchema: z.ZodType<Prisma.roles_permissionsCreateManyPermissionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => roles_permissionsCreateManyPermissionsInputSchema),z.lazy(() => roles_permissionsCreateManyPermissionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default roles_permissionsCreateManyPermissionsInputEnvelopeSchema;
