import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { permissionsOrderByRelationAggregateInputSchema } from './permissionsOrderByRelationAggregateInputSchema';
import { rolesOrderByRelationAggregateInputSchema } from './rolesOrderByRelationAggregateInputSchema';
import { roles_permissionsOrderByRelationAggregateInputSchema } from './roles_permissionsOrderByRelationAggregateInputSchema';
import { users_permissionsOrderByRelationAggregateInputSchema } from './users_permissionsOrderByRelationAggregateInputSchema';
import { users_rolesOrderByRelationAggregateInputSchema } from './users_rolesOrderByRelationAggregateInputSchema';

export const usersOrderByWithRelationInputSchema: z.ZodType<Prisma.usersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  last_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_super_user: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  card_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  card_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birth_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  car_model: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  car_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_online: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fcm_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  wallet_balance: z.lazy(() => SortOrderSchema).optional(),
  max_active_order_count: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  doc_files: z.lazy(() => SortOrderSchema).optional(),
  order_start_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  app_version: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  api_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tg_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  permissions_permissions_created_byTousers: z.lazy(() => permissionsOrderByRelationAggregateInputSchema).optional(),
  permissions_permissions_updated_byTousers: z.lazy(() => permissionsOrderByRelationAggregateInputSchema).optional(),
  roles_roles_created_byTousers: z.lazy(() => rolesOrderByRelationAggregateInputSchema).optional(),
  roles_roles_updated_byTousers: z.lazy(() => rolesOrderByRelationAggregateInputSchema).optional(),
  roles_permissions_roles_permissions_created_byTousers: z.lazy(() => roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  roles_permissions_roles_permissions_updated_byTousers: z.lazy(() => roles_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_created_by: z.lazy(() => users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_updated_by: z.lazy(() => users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_permissions_usersTousers_permissions_user_id: z.lazy(() => users_permissionsOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_created_by: z.lazy(() => users_rolesOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_updated_by: z.lazy(() => users_rolesOrderByRelationAggregateInputSchema).optional(),
  users_roles_usersTousers_roles_user_id: z.lazy(() => users_rolesOrderByRelationAggregateInputSchema).optional()
}).strict();

export default usersOrderByWithRelationInputSchema;
