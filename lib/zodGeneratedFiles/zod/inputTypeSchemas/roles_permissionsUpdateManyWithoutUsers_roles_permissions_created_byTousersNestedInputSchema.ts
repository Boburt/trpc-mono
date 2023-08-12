import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema } from './roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema';
import { roles_permissionsWhereUniqueInputSchema } from './roles_permissionsWhereUniqueInputSchema';
import { roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema } from './roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema';
import { roles_permissionsScalarWhereInputSchema } from './roles_permissionsScalarWhereInputSchema';

export const roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array(),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUncheckedCreateWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsCreateOrConnectWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpsertWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => roles_permissionsCreateManyUsers_roles_permissions_created_byTousersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => roles_permissionsWhereUniqueInputSchema),z.lazy(() => roles_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateWithWhereUniqueWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema),z.lazy(() => roles_permissionsUpdateManyWithWhereWithoutUsers_roles_permissions_created_byTousersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => roles_permissionsScalarWhereInputSchema),z.lazy(() => roles_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default roles_permissionsUpdateManyWithoutUsers_roles_permissions_created_byTousersNestedInputSchema;
