import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesScalarWhereInputSchema } from './rolesScalarWhereInputSchema';
import { rolesUpdateManyMutationInputSchema } from './rolesUpdateManyMutationInputSchema';
import { rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInputSchema } from './rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInputSchema';

export const rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInput> = z.object({
  where: z.lazy(() => rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => rolesUpdateManyMutationInputSchema),z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_updated_byTousersInputSchema) ]),
}).strict();

export default rolesUpdateManyWithWhereWithoutUsers_roles_updated_byTousersInputSchema;
