import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';
import { rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema } from './rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema';
import { rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema } from './rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema';
import { rolesCreateWithoutUsers_roles_updated_byTousersInputSchema } from './rolesCreateWithoutUsers_roles_updated_byTousersInputSchema';
import { rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema } from './rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema';

export const rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => rolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => rolesUpdateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_roles_updated_byTousersInputSchema) ]),
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_roles_updated_byTousersInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export default rolesUpsertWithWhereUniqueWithoutUsers_roles_updated_byTousersInputSchema;
