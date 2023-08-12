import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema';
import { roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema';
import { roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema } from './roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema';
import { roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema } from './roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';

export const roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema: z.ZodType<Prisma.roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_updated_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_updated_byTousersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default roles_permissionsCreateNestedManyWithoutUsers_roles_permissions_updated_byTousersInputSchema;
