import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutRoles_roles_updated_byTousersInputSchema } from './usersUpdateWithoutRoles_roles_updated_byTousersInputSchema';
import { usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema } from './usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema';

export const usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema;
