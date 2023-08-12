import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { permissionsCreateNestedOneWithoutUsers_permissionsInputSchema } from './permissionsCreateNestedOneWithoutUsers_permissionsInputSchema';
import { usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema } from './usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema';

export const users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional()
}).strict();

export default users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema;
