import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema } from './usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema } from './usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema';
import { users_permissionsCreateNestedManyWithoutPermissionsInputSchema } from './users_permissionsCreateNestedManyWithoutPermissionsInputSchema';

export const permissionsCreateWithoutRoles_permissionsInputSchema: z.ZodType<Prisma.permissionsCreateWithoutRoles_permissionsInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users_permissions_created_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  users_permissions_updated_byTousers: z.lazy(() => usersCreateNestedOneWithoutPermissions_permissions_updated_byTousersInputSchema).optional(),
  users_permissions: z.lazy(() => users_permissionsCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export default permissionsCreateWithoutRoles_permissionsInputSchema;
