import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema } from './usersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema';
import { usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema } from './usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema';

export const usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_created_byTousersInputSchema;
