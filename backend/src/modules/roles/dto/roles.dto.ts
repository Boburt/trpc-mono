import { paginatedZodObj } from "@backend/lib/z_objects";
import { z } from "zod";

export type rolesCreateInput = {
  id?: string;
  name: string;
  code?: string;
  active?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
};

export const rolesFindManyZod = paginatedZodObj.extend({
  where: z
    .object({
      name: z.string().optional(),
      code: z.string().optional(),
      active: z.boolean().optional(),
      created_at: z.date().optional(),
    })
    .optional(),
});

import { PermissionResponseDto } from "@backend/modules/permissions/dto/permissions.dto";
import { InferSelectModel } from "drizzle-orm";
import { roles, roles_permissions } from "backend/drizzle/schema";

export interface RoleResponseDto {
  name: string;

  permissions: PermissionResponseDto[];

  active: boolean;
}

export type RolesWithRelations = InferSelectModel<typeof roles> & {
  permissions: string[];
};
