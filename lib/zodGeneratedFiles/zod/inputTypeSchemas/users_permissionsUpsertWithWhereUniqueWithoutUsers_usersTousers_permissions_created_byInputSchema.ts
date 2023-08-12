import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema';
import { users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema';
import { users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema';
import { users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema';

export const users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedUpdateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export default users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_created_byInputSchema;
