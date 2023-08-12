import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema } from './usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema';
import { permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema } from './permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema';
import { usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema } from './usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema';

export const users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_updated_byNestedInputSchema).optional()
}).strict();

export default users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema;
