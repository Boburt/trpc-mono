import { z } from "zod";
import { paginatedZodObj } from "@backend/lib/z_objects";
import { InferSelectModel } from "drizzle-orm";
import { permissions, roles_permissions } from "backend/drizzle/schema";

export type rolesPermissionsCreateInput = {
  role_id: string;
  permission_id: string;
  created_by?: string;
  updated_by?: string;
};

export const rolesPermissionsFindManyZod = paginatedZodObj.extend({
  where: z
    .object({
      role_id: z.string().optional(),
      permission_id: z.string().optional(),
      created_by: z.string().optional(),
      updated_by: z.string().optional(),
    })
    .optional(),
});


export type RolesPermissions = InferSelectModel<typeof roles_permissions>;

export type RolesPermissionsRelation = RolesPermissions & {
  permissions: InferSelectModel<typeof permissions>
}