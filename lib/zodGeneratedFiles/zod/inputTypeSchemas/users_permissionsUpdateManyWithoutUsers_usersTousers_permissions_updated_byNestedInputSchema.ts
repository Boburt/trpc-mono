import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema';
import { users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema';
import { users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema';
import { users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema';
import { users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema } from './users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';
import { users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema';
import { users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema } from './users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema';
import { users_permissionsScalarWhereInputSchema } from './users_permissionsScalarWhereInputSchema';

export const users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema: z.ZodType<Prisma.users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpsertWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_updated_byInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpdateWithWhereUniqueWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema),z.lazy(() => users_permissionsUpdateManyWithWhereWithoutUsers_usersTousers_permissions_updated_byInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => users_permissionsScalarWhereInputSchema),z.lazy(() => users_permissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default users_permissionsUpdateManyWithoutUsers_usersTousers_permissions_updated_byNestedInputSchema;
