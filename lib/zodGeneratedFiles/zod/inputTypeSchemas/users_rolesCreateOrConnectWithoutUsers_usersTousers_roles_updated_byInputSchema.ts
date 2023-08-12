import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema } from './users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema';
import { users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema } from './users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema';

export const users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_rolesCreateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export default users_rolesCreateOrConnectWithoutUsers_usersTousers_roles_updated_byInputSchema;
