import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { usersArgsSchema } from "../outputTypeSchemas/usersArgsSchema"
import { roles_permissionsFindManyArgsSchema } from "../outputTypeSchemas/roles_permissionsFindManyArgsSchema"
import { users_permissionsFindManyArgsSchema } from "../outputTypeSchemas/users_permissionsFindManyArgsSchema"
import { PermissionsCountOutputTypeArgsSchema } from "../outputTypeSchemas/PermissionsCountOutputTypeArgsSchema"

export const permissionsIncludeSchema: z.ZodType<Prisma.permissionsInclude> = z.object({
  users_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  users_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => usersArgsSchema)]).optional(),
  roles_permissions: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default permissionsIncludeSchema;
