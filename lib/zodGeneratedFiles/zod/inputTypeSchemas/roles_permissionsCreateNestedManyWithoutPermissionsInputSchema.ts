import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateWithoutPermissionsInputSchema } from './roles_permissionsCreateWithoutPermissionsInputSchema';
import { roles_permissionsUncheckedCreateWithoutPermissionsInputSchema } from './roles_permissionsUncheckedCreateWithoutPermissionsInputSchema';
import { roles_permissionsCreateOrConnectWithoutPermissionsInputSchema } from './roles_permissionsCreateOrConnectWithoutPermissionsInputSchema';
import { roles_permissionsCreateManyPermissionsInputEnvelopeSchema } from './roles_permissionsCreateManyPermissionsInputEnvelopeSchema';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';

export const roles_permissionsCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.roles_permissionsCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateWithoutPermissionsInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyPermissionsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default roles_permissionsCreateNestedManyWithoutPermissionsInputSchema;
