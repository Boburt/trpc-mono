import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const usersCountOutputTypeSelectSchema: z.ZodType<Prisma.usersCountOutputTypeSelect> = z.object({
  permissions_permissions_created_byTousers: z.boolean().optional(),
  permissions_permissions_updated_byTousers: z.boolean().optional(),
  roles_roles_created_byTousers: z.boolean().optional(),
  roles_roles_updated_byTousers: z.boolean().optional(),
  roles_permissions_roles_permissions_created_byTousers: z.boolean().optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.boolean().optional(),
  users_permissions_usersTousers_permissions_created_by: z.boolean().optional(),
  users_permissions_usersTousers_permissions_updated_by: z.boolean().optional(),
  users_permissions_usersTousers_permissions_user_id: z.boolean().optional(),
  users_roles_usersTousers_roles_created_by: z.boolean().optional(),
  users_roles_usersTousers_roles_updated_by: z.boolean().optional(),
  users_roles_usersTousers_roles_user_id: z.boolean().optional(),
}).strict();

export default usersCountOutputTypeSelectSchema;
