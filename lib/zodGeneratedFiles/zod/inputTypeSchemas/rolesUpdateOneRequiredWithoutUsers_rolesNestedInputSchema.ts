import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { rolesCreateWithoutUsers_rolesInputSchema } from './rolesCreateWithoutUsers_rolesInputSchema';
import { rolesUncheckedCreateWithoutUsers_rolesInputSchema } from './rolesUncheckedCreateWithoutUsers_rolesInputSchema';
import { rolesCreateOrConnectWithoutUsers_rolesInputSchema } from './rolesCreateOrConnectWithoutUsers_rolesInputSchema';
import { rolesUpsertWithoutUsers_rolesInputSchema } from './rolesUpsertWithoutUsers_rolesInputSchema';
import { rolesWhereUniqueInputSchema } from './rolesWhereUniqueInputSchema';
import { rolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema } from './rolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema';
import { rolesUpdateWithoutUsers_rolesInputSchema } from './rolesUpdateWithoutUsers_rolesInputSchema';
import { rolesUncheckedUpdateWithoutUsers_rolesInputSchema } from './rolesUncheckedUpdateWithoutUsers_rolesInputSchema';

export const rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema: z.ZodType<Prisma.rolesUpdateOneRequiredWithoutUsers_rolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => rolesCreateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedCreateWithoutUsers_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => rolesCreateOrConnectWithoutUsers_rolesInputSchema).optional(),
  upsert: z.lazy(() => rolesUpsertWithoutUsers_rolesInputSchema).optional(),
  connect: z.lazy(() => rolesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => rolesUpdateToOneWithWhereWithoutUsers_rolesInputSchema),z.lazy(() => rolesUpdateWithoutUsers_rolesInputSchema),z.lazy(() => rolesUncheckedUpdateWithoutUsers_rolesInputSchema) ]).optional(),
}).strict();

export default rolesUpdateOneRequiredWithoutUsers_rolesNestedInputSchema;
