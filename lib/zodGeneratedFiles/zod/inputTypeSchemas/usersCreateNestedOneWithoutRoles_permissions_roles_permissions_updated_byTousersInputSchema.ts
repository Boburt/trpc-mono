import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';

export const usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export default usersCreateNestedOneWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema;
