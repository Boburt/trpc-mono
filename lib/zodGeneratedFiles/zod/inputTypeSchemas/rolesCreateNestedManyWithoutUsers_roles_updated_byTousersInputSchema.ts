import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateWithoutUsers_roles_updated_byTousersInputSchema } from './rolesCreateWithoutUsers_roles_updated_byTousersInputSchema';
import { rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema } from './rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema';
import { rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema } from './rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema';
import { rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema } from './rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';

export const rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema).array(),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesCreateOrConnectWithoutUsers_roles_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => rolesCreateManyUsers_roles_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => rolesWhereUniqueInputSchema),z.lazy(() => rolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default rolesCreateNestedManyWithoutUsers_roles_updated_byTousersInputSchema;
