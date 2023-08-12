import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';

export const usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]),
}).strict();

export default usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema;