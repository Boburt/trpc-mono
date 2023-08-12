import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutRoles_roles_updated_byTousersInputSchema } from './usersCreateWithoutRoles_roles_updated_byTousersInputSchema';
import { usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema } from './usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema';
import { usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema } from './usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';

export const usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutRoles_roles_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export default usersCreateNestedOneWithoutRoles_roles_updated_byTousersInputSchema;
