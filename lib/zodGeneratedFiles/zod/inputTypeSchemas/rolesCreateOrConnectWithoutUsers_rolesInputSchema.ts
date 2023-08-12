import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';
import { rolesCreateWithoutUsers_rolesInputSchema } from './rolesCreateWithoutUsers_rolesInputSchema';
import { rolesUncheckedCreateWithoutUsers_rolesInputSchema } from './rolesUncheckedCreateWithoutUsers_rolesInputSchema';

export const rolesCreateOrConnectWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesCreateOrConnectWithoutUsers_rolesInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_rolesInputSchema) ]),
}).strict();

export default rolesCreateOrConnectWithoutUsers_rolesInputSchema;
