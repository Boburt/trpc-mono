import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateManyUsers_roles_updated_byTousersInputSchema } from './rolesCreateManyUsers_roles_updated_byTousersInputSchema';

export const rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema: z.ZodType<Prisma.rolesCreateManyUsers_roles_updated_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema;
