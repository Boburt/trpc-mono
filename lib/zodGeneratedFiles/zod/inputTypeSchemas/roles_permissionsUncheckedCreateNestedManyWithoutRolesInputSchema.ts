import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateWithoutRolesInputSchema } from './roles_permissionsCreateWithoutRolesInputSchema';
import { roles_permissionsUncheckedCreateWithoutRolesInputSchema } from './roles_permissionsUncheckedCreateWithoutRolesInputSchema';
import { roles_permissionsCreateOrConnectWithoutRolesInputSchema } from './roles_permissionsCreateOrConnectWithoutRolesInputSchema';
import { roles_permissionsCreateManyRolesInputEnvelopeSchema } from './roles_permissionsCreateManyRolesInputEnvelopeSchema';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';

export const roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.roles_permissionsUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateWithoutRolesInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default roles_permissionsUncheckedCreateNestedManyWithoutRolesInputSchema;
