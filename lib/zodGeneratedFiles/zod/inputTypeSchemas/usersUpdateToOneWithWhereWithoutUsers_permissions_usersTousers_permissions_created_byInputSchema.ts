import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';
import { usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema } from './usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema';

export const usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema),z.lazy(() => usersUncheckedUpdateWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutUsers_permissions_usersTousers_permissions_created_byInputSchema;
