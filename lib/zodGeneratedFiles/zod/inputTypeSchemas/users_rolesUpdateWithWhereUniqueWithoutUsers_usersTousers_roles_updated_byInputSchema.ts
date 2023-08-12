import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';
import { users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema } from './users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema';
import { users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema } from './users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema';

export const users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => users_rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema),z.lazy(() => users_rolesUncheckedUpdateWithoutUsers_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export default users_rolesUpdateWithWhereUniqueWithoutUsers_usersTousers_roles_updated_byInputSchema;
