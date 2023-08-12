import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema } from './roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema';

export const permissionsUncheckedCreateWithoutUsers_permissionsInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateWithoutUsers_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  created_by: z.string().optional().nullable(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export default permissionsUncheckedCreateWithoutUsers_permissionsInputSchema;
