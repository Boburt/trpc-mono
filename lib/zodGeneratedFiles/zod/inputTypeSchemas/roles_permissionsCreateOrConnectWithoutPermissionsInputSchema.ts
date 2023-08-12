import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsCreateWithoutPermissionsInputSchema } from './roles_permissionsCreateWithoutPermissionsInputSchema';
import { roles_permissionsUncheckedCreateWithoutPermissionsInputSchema } from './roles_permissionsUncheckedCreateWithoutPermissionsInputSchema';

export const roles_permissionsCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => roles_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export default roles_permissionsCreateOrConnectWithoutPermissionsInputSchema;
