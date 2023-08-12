import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesUpdateWithoutUsers_rolesInputSchema } from './rolesUpdateWithoutUsers_rolesInputSchema';
import { rolesUncheckedUpdateWithoutUsers_rolesInputSchema } from './rolesUncheckedUpdateWithoutUsers_rolesInputSchema';
import { rolesCreateWithoutUsers_rolesInputSchema } from './rolesCreateWithoutUsers_rolesInputSchema';
import { rolesUncheckedCreateWithoutUsers_rolesInputSchema } from './rolesUncheckedCreateWithoutUsers_rolesInputSchema';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';

export const rolesUpsertWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesUpsertWithoutUsers_rolesInput> = z.object({
  update: z.union([ z.lazy(() => rolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_rolesInputSchema) ]),
  where: z.lazy(() => rolesWhereInputSchema).optional()
}).strict();

export default rolesUpsertWithoutUsers_rolesInputSchema;
