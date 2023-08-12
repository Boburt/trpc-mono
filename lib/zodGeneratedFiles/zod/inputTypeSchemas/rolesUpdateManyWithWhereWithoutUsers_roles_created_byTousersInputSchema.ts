import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesScalarWhereInputSchema } from './rolesScalarWhereInputSchema';
import { rolesUpdateManyMutationInputSchema } from './rolesUpdateManyMutationInputSchema';
import { rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInputSchema } from './rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInputSchema';

export const rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema: z.ZodType<Prisma.rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInput> = z.object({
  where: z.lazy(() => rolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => rolesUpdateManyMutationInputSchema),z.lazy(() => rolesUncheckedUpdateManyWithoutUsers_roles_created_byTousersInputSchema) ]),
}).strict();

export default rolesUpdateManyWithWhereWithoutUsers_roles_created_byTousersInputSchema;
