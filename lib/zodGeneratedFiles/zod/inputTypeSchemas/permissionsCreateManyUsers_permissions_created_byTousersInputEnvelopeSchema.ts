import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateManyUsers_permissions_created_byTousersInputSchema } from './permissionsCreateManyUsers_permissions_created_byTousersInputSchema';

export const permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.permissionsCreateManyUsers_permissions_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputSchema),z.lazy(() => permissionsCreateManyUsers_permissions_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default permissionsCreateManyUsers_permissions_created_byTousersInputEnvelopeSchema;
