import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema';
import { users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema } from './users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';

export const users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyUsers_usersTousers_roles_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default users_rolesCreateNestedManyWithoutUsers_usersTousers_roles_created_byInputSchema;
