import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema';

export const users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema) ]),
}).strict();

export default users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema;
