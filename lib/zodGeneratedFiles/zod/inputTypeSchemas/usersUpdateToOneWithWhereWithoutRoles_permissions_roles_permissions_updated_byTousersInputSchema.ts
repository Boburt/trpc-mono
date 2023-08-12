import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';

export const usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema;
