import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { permissionsCreateNestedOneWithoutUsers_permissionsInputSchema } from './permissionsCreateNestedOneWithoutUsers_permissionsInputSchema';
import { usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema } from './usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema';
import { usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';

export const users_permissionsCreateInputSchema: z.ZodType<Prisma.users_permissionsCreateInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  permissions: z.lazy(() => permissionsCreateNestedOneWithoutUsers_permissionsInputSchema),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export default users_permissionsCreateInputSchema;
