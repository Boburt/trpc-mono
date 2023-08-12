import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export default usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema;
