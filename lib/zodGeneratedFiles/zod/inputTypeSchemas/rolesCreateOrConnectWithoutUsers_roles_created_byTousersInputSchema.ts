import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';
import { rolesCreateWithoutUsers_roles_created_byTousersInputSchema } from './rolesCreateWithoutUsers_roles_created_byTousersInputSchema';
import { rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema } from './rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema';

export const rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export default rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema;
