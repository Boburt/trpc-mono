import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema } from './usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema';
import { permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema } from './permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema';
import { usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema } from './usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema';

export const users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  users_usersTousers_permissions_created_by: z.lazy(() => usersUpdateOneWithoutUsers_permissions_usersTousers_permissions_created_byNestedInputSchema).optional(),
  permissions: z.lazy(() => permissionsUpdateOneRequiredWithoutUsers_permissionsNestedInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersUpdateOneRequiredWithoutUsers_permissions_usersTousers_permissions_user_idNestedInputSchema).optional()
}).strict();

export default users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema;
