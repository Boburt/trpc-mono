import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateManyUsers_roles_created_byTousersInputSchema } from './rolesCreateManyUsers_roles_created_byTousersInputSchema';

export const rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema: z.ZodType<Prisma.rolesCreateManyUsers_roles_created_byTousersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema;
