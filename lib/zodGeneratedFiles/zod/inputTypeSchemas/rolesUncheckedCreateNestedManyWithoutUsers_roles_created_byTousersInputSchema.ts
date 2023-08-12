import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateWithoutUsers_roles_created_byTousersInputSchema } from './rolesCreateWithoutUsers_roles_created_byTousersInputSchema';
import { rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema } from './rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema';
import { rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema } from './rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema';
import { rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema } from './rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';

export const rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_created_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_created_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default rolesUncheckedCreateNestedManyWithoutUsers_roles_created_byTousersInputSchema;
