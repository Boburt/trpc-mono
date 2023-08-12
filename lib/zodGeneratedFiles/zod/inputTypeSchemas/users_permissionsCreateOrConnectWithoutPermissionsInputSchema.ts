import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsCreateWithoutPermissionsInputSchema } from './users_permissionsCreateWithoutPermissionsInputSchema';
import { users_permissionsUncheckedCreateWithoutPermissionsInputSchema } from './users_permissionsUncheckedCreateWithoutPermissionsInputSchema';

export const users_permissionsCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => users_permissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export default users_permissionsCreateOrConnectWithoutPermissionsInputSchema;
