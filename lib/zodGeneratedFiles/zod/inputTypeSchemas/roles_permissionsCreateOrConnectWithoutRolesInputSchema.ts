import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsCreateWithoutRolesInputSchema } from './roles_permissionsCreateWithoutRolesInputSchema';
import { roles_permissionsUncheckedCreateWithoutRolesInputSchema } from './roles_permissionsUncheckedCreateWithoutRolesInputSchema';

export const roles_permissionsCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export default roles_permissionsCreateOrConnectWithoutRolesInputSchema;
