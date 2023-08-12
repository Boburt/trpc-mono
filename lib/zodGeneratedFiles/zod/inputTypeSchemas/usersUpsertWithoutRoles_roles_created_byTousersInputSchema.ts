import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersUpdateWithoutRoles_roles_created_byTousersInputSchema } from './usersUpdateWithoutRoles_roles_created_byTousersInputSchema';
import { usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema } from './usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema';
import { usersCreateWithoutRoles_roles_created_byTousersInputSchema } from './usersCreateWithoutRoles_roles_created_byTousersInputSchema';
import { usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema } from './usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';

export const usersUpsertWithoutRoles_roles_created_byTousersInputSchema: z.ZodType<Prisma.usersUpsertWithoutRoles_roles_created_byTousersInput> = z.object({
  update: z.union([ z.lazy(() => usersUpdateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_created_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_created_byTousersInputSchema) ]),
  where: z.lazy(() => usersWhereInputSchema).optional()
}).strict();

export default usersUpsertWithoutRoles_roles_created_byTousersInputSchema;
