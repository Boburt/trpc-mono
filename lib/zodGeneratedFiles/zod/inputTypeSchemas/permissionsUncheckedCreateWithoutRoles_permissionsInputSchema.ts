import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema } from './users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema';

export const permissionsUncheckedCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  users_permissions: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export default permissionsUncheckedCreateWithoutRoles_permissionsInputSchema;
