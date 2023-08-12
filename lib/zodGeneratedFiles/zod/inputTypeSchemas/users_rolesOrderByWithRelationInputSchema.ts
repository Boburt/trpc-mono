import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { usersOrderByWithRelationInputSchema } from './usersOrderByWithRelationInputSchema';
import { rolesOrderByWithRelationInputSchema } from './rolesOrderByWithRelationInputSchema';

export const users_rolesOrderByWithRelationInputSchema: z.ZodType<Prisma.users_rolesOrderByWithRelationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_usersTousers_roles_created_by: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  roles: z.lazy(() => rolesOrderByWithRelationInputSchema).optional(),
  users_usersTousers_roles_updated_by: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  users_usersTousers_roles_user_id: z.lazy(() => usersOrderByWithRelationInputSchema).optional()
}).strict();

export default users_rolesOrderByWithRelationInputSchema;
