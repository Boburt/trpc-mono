import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema } from './usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema';
import { usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema } from './usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema';
import { usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema } from './usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema';

export const users_permissionsUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithoutPermissionsInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export default users_permissionsUpdateWithoutPermissionsInputSchema;
