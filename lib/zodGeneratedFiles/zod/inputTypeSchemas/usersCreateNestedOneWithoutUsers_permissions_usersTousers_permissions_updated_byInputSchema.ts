import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema } from './usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema';
import { usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema } from './usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema';
import { usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema } from './usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';

export const usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional()
}).strict();

export default usersCreateNestedOneWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema;
