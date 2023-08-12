import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema } from './users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema';
import { users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema } from './users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';

export const users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema: z.ZodType<Prisma.users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_user_idInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_user_idInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_user_idInputSchema;
