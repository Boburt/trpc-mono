import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema';
import { roles_permissionsCreateNestedManyWithoutPermissionsInputSchema } from './roles_permissionsCreateNestedManyWithoutPermissionsInputSchema';
import { users_permissionsCreateNestedManyWithoutPermissionsInputSchema } from './users_permissionsCreateNestedManyWithoutPermissionsInputSchema';

export const permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema: z.ZodType<Prisma.permissionsCreateWithoutUsers_permissions_created_byTousersInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  roles_permissions: z.lazy(() => roles_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export default permissionsCreateWithoutUsers_permissions_created_byTousersInputSchema;
