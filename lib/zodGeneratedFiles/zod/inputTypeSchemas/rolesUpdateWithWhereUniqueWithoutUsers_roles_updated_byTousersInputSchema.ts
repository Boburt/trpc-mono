import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';
import { rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema } from './rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema';
import { rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema } from './rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema';

export const rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export default rolesUpdateWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema;
