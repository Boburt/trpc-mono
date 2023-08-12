import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateManyPermissionsInputSchema } from './users_permissionsCreateManyPermissionsInputSchema';

export const users_permissionsCreateManyPermissionsInputEnvelopeSchema: z.ZodType<Prisma.users_permissionsCreateManyPermissionsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => users_permissionsCreateManyPermissionsInputSchema),z.lazy(() => users_permissionsCreateManyPermissionsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default users_permissionsCreateManyPermissionsInputEnvelopeSchema;
