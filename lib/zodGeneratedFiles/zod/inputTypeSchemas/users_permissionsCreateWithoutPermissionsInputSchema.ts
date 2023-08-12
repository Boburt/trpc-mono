import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema } from './usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema';
import { usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema } from './usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema';

export const users_permissionsCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsCreateWithoutPermissionsInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_user_idInputSchema)
}).strict();

export default users_permissionsCreateWithoutPermissionsInputSchema;
