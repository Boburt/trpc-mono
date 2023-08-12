import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateWithoutUsers_rolesInputSchema } from './rolesCreateWithoutUsers_rolesInputSchema';
import { rolesUncheckedCreateWithoutUsers_rolesInputSchema } from './rolesUncheckedCreateWithoutUsers_rolesInputSchema';
import { rolesCreateOrConnectWithoutUsers_rolesInputSchema } from './rolesCreateOrConnectWithoutUsers_rolesInputSchema';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';

export const rolesCreateNestedOneWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesCreateNestedOneWithoutUsers_rolesInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutUsers_rolesInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional()
}).strict();

export default rolesCreateNestedOneWithoutUsers_rolesInputSchema;
