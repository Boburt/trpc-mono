import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const usersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export default usersUpsertWithoutUsers_roles_usersTousers_roles_updated_byInputSchema;
