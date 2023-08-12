import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_rolesCreateWithoutRolesInputSchema } from './users_rolesCreateWithoutRolesInputSchema';
import { users_rolesUncheckedCreateWithoutRolesInputSchema } from './users_rolesUncheckedCreateWithoutRolesInputSchema';
import { users_rolesCreateOrConnectWithoutRolesInputSchema } from './users_rolesCreateOrConnectWithoutRolesInputSchema';
import { users_rolesCreateManyRolesInputEnvelopeSchema } from './users_rolesCreateManyRolesInputEnvelopeSchema';
import { users_rolesWhereUniqueInputSchema } from './users_rolesWhereUniqueInputSchema';

export const users_rolesCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.users_rolesCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => users_rolesCreateWithoutRolesInputSchema),z.lazy(() => users_rolesCreateWithoutRolesInputSchema).array(),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema),z.lazy(() => users_rolesUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema),z.lazy(() => users_rolesCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_rolesCreateManyRolesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_rolesWhereUniqueInputSchema),z.lazy(() => users_rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default users_rolesCreateNestedManyWithoutRolesInputSchema;
