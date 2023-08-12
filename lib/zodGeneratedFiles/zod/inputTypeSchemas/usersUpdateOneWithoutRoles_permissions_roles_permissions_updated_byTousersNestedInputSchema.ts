import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';
import { usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema } from './usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema';

export const usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutRoles_permissions_roles_permissions_updated_byTousersInputSchema) ]).optional(),
}).strict();

export default usersUpdateOneWithoutRoles_permissions_roles_permissions_updated_byTousersNestedInputSchema;
