import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereInputSchema } from './rolesWhereInputSchema';
import { rolesUpdateWithoutUsers_rolesInputSchema } from './rolesUpdateWithoutUsers_rolesInputSchema';
import { rolesUncheckedUpdateWithoutUsers_rolesInputSchema } from './rolesUncheckedUpdateWithoutUsers_rolesInputSchema';

export const rolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema: z.ZodType<Prisma.rolesUpdateToOneWithWhereWithoutUsers_rolesInput> = z.object({
  where: z.lazy(() => rolesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => rolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]),
}).strict();

export default rolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema;
