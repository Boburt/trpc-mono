import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema } from './users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema';
import { users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema } from './users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';

export const users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_user_idInputSchema;
