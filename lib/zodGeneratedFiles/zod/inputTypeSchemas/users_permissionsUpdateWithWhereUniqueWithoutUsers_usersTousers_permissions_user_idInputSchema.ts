import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema';

export const users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export default users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_user_idInputSchema;
