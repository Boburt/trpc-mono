import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema';
import { users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema';
import { users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema } from './users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema';
import { users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema } from './users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema';
import { users_permissionsWhereUniqueInputSchema } from './users_permissionsWhereUniqueInputSchema';

export const users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema: z.ZodType<Prisma.users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInput> = z.object({
  create: z.union([ z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array(),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsUncheckedCreateWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema),z.lazy(() => users_permissionsCreateOrConnectWithoutUsers_usersTousers_permissions_created_byInputSchema).array() ]).optional(),
  createMany: z.lazy(() => users_permissionsCreateManyUsers_usersTousers_permissions_created_byInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => users_permissionsWhereUniqueInputSchema),z.lazy(() => users_permissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default users_permissionsUncheckedCreateNestedManyWithoutUsers_usersTousers_permissions_created_byInputSchema;
