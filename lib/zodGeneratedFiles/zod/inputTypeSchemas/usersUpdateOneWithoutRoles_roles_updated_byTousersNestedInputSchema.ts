import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutRoles_roles_updated_byTousersInputSchema } from './usersCreateWithoutRoles_roles_updated_byTousersInputSchema';
import { usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema } from './usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema';
import { usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema } from './usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema';
import { usersUpsertWithoutRoles_roles_updated_byTousersInputSchema } from './usersUpsertWithoutRoles_roles_updated_byTousersInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema } from './usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema';
import { usersUpdateWithoutRoles_roles_updated_byTousersInputSchema } from './usersUpdateWithoutRoles_roles_updated_byTousersInputSchema';
import { usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema } from './usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema';

export const usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutRoles_roles_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUpdateWithoutRoles_roles_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_roles_updated_byTousersInputSchema) ]).optional(),
}).strict();

export default usersUpdateOneWithoutRoles_roles_updated_byTousersNestedInputSchema;
