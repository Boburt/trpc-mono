import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { permissionsFindManyArgsSchema } from "../outputTypeSchemas/permissionsFindManyArgsSchema"
import { rolesFindManyArgsSchema } from "../outputTypeSchemas/rolesFindManyArgsSchema"
import { roles_permissionsFindManyArgsSchema } from "../outputTypeSchemas/roles_permissionsFindManyArgsSchema"
import { users_permissionsFindManyArgsSchema } from "../outputTypeSchemas/users_permissionsFindManyArgsSchema"
import { users_rolesFindManyArgsSchema } from "../outputTypeSchemas/users_rolesFindManyArgsSchema"
import { UsersCountOutputTypeArgsSchema } from "../outputTypeSchemas/UsersCountOutputTypeArgsSchema"

export const usersIncludeSchema: z.ZodType<Prisma.usersInclude> = z.object({
  permissions_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => permissionsFindManyArgsSchema)]).optional(),
  permissions_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => permissionsFindManyArgsSchema)]).optional(),
  roles_roles_created_byTousers: z.union([z.boolean(),z.lazy(() => rolesFindManyArgsSchema)]).optional(),
  roles_roles_updated_byTousers: z.union([z.boolean(),z.lazy(() => rolesFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.union([z.boolean(),z.lazy(() => roles_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_created_by: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_permissions_usersTousers_permissions_user_id: z.union([z.boolean(),z.lazy(() => users_permissionsFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_created_by: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_updated_by: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  users_roles_usersTousers_roles_user_id: z.union([z.boolean(),z.lazy(() => users_rolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UsersCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default usersIncludeSchema;
