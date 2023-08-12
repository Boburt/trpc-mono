import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { permissionsArgsSchema } from "../outputTypeSchemas/permissionsArgsSchema"

export const users_permissionsIncludeSchema: z.ZodType<Prisma.users_permissionsInclude> = z.object({
  users_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => permissionsArgsSchema)]).optional(),
  users_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
}).strict()

export default users_permissionsIncludeSchema;
