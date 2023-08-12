import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesScalarWhereInputSchema } from './users_rolesScalarWhereInputSchema';
import { users_rolesUpdateManyMutationInputSchema } from './users_rolesUpdateManyMutationInputSchema';
import { users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInputSchema } from './users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInputSchema';

export const users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema: z.ZodType<Prisma.users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInput> = z.object({
  where: z.lazy(() => users_rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_rolesUpdateManyMutationInputSchema),z.lazy(() => users_rolesUncheckedUpdateManyWithoutUsers_usersTousers_roles_created_byInputSchema) ]),
}).strict();

export default users_rolesUpdateManyWithWhereWithoutUsers_usersTousers_roles_created_byInputSchema;
