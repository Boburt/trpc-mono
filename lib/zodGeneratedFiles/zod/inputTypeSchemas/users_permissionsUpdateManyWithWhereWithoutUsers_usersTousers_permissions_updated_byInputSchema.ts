import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsScalarWhereInputSchema } from './users_permissionsScalarWhereInputSchema';
import { users_permissionsUpdateManyMutationInputSchema } from './users_permissionsUpdateManyMutationInputSchema';
import { users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInputSchema';

export const users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => users_permissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateManyMutationInputSchema),z.lazy(() => users_permissionsUncheckedUpdateManyWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export default users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema;
