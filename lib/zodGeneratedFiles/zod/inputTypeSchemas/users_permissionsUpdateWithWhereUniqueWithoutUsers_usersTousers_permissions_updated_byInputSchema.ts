import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema';
import { users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema';

export const users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export default users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema;
