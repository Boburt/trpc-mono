import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';
import { usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema } from './usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema';

export const usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_roles_usersTousers_roles_updated_byInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutUsers_roles_usersTousers_roles_updated_byInputSchema;
