import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema } from './usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema';
import { usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema } from './usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema';

export const usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema: z.ZodType<Prisma.usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInput> = z.object({
  where: z.lazy(() => usersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => usersCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema),z.lazy(() => usersUncheckedCreateWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema) ]),
}).strict();

export default usersCreateOrConnectWithoutUsers_permissions_usersTousers_permissions_updated_byInputSchema;
