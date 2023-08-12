import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { usersOrderByWithRelationInputSchema } from './usersOrderByWithRelationInputSchema';
import { permissionsOrderByWithRelationInputSchema } from './permissionsOrderByWithRelationInputSchema';

export const users_permissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.users_permissionsOrderByWithRelationInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users_usersTousers_permissions_created_by: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  permissions: z.lazy(() => permissionsOrderByWithRelationInputSchema).optional(),
  users_usersTousers_permissions_updated_by: z.lazy(() => usersOrderByWithRelationInputSchema).optional(),
  users_usersTousers_permissions_user_id: z.lazy(() => usersOrderByWithRelationInputSchema).optional()
}).strict();

export default users_permissionsOrderByWithRelationInputSchema;
