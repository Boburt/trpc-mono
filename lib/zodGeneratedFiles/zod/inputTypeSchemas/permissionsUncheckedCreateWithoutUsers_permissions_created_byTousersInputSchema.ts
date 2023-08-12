import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema } from './roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema';
import { users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema } from './users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema';

export const permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  updated_by: z.string().optional().nullable(),
  roles_permissions: z.lazy(() => roles_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export default permissionsUncheckedCreateWithoutUsers_permissions_created_byTousersInputSchema;
