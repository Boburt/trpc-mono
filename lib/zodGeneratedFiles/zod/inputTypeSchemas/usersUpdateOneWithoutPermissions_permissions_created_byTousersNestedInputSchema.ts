import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { usersCreateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersCreateWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema } from './usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersUpsertWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUpsertWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersWhereInputSchema } from './usersWhereInputSchema';
import { usersWhereUniqueInputSchema } from './usersWhereUniqueInputSchema';
import { usersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema';
import { usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema } from './usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema';

export const usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema: z.ZodType<Prisma.usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInput> = z.object({
  create: z.union([ z.lazy(() => usersCreateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedCreateWithoutPermissions_permissions_created_byTousersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => usersCreateOrConnectWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  upsert: z.lazy(() => usersUpsertWithoutPermissions_permissions_created_byTousersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => usersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => usersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => usersUpdateToOneWithWhereWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUpdateWithoutPermissions_permissions_created_byTousersInputSchema),z.lazy(() => usersUncheckedUpdateWithoutPermissions_permissions_created_byTousersInputSchema) ]).optional(),
}).strict();

export default usersUpdateOneWithoutPermissions_permissions_created_byTousersNestedInputSchema;
