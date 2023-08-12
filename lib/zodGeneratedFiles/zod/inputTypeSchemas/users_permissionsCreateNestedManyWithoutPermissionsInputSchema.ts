import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateWithoutPermissionsInputSchema } from './users_permissionsCreateWithoutPermissionsInputSchema';
import { users_permissionsUncheckedCreateWithoutPermissionsInputSchema } from './users_permissionsUncheckedCreateWithoutPermissionsInputSchema';
import { users_permissionsCreateOrConnectWithoutPermissionsInputSchema } from './users_permissionsCreateOrConnectWithoutPermissionsInputSchema';
import { users_permissionsCreateManyPermissionsInputEnvelopeSchema } from './users_permissionsCreateManyPermissionsInputEnvelopeSchema';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';

export const users_permissionsCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.users_permissionsCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default users_permissionsCreateNestedManyWithoutPermissionsInputSchema;
