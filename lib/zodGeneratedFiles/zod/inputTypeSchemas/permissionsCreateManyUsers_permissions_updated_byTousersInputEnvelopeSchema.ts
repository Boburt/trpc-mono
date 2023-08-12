import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { permissionsCreateManyUsers_permissions_updated_byTousersInputSchema } from './permissionsCreateManyUsers_permissions_updated_byTousersInputSchema';

export const permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputSchema),z.lazy(() => permissionsCreateManyUsers_permissions_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default permissionsCreateManyUsers_permissions_updated_byTousersInputEnvelopeSchema;
