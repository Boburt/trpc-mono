import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutRoles_roles_created_byTousersInputSchema } from './usersUpdateWithoutRoles_roles_created_byTousersInputSchema';
import { usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema } from './usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema';

export const usersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutRoles_roles_created_byTousersInputSchema;
