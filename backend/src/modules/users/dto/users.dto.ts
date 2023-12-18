import { UsersSchema } from "@backend/lib/zod";
import { z } from "zod";

export const loginInput = z.object({
  login: z.string(),
  password: z.string(),
});

export const refreshTokenInput = z.object({
  refreshToken: z.string(),
});

export const typeLoginOutput = z.object({
  data: UsersSchema.omit({ password: true, salt: true }),
  refreshToken: z.string(),
  accessToken: z.string(),
  rights: z.array(z.string()),
});

import { PermissionResponseDto } from "@backend/modules/permissions//dto/permissions.dto";
import { RoleResponseDto } from "@backend/modules/roles/dto/roles.dto";

export interface UserResponseDto {
  id: string;

  phone: string;

  first_name?: string;

  last_name?: string;

  roles?: RoleResponseDto[];

  permissions?: PermissionResponseDto[];

  is_super_user: boolean;

  status: string;

  terminal_id: string[];

  is_online: boolean;

  wallet_balance: number;

  api_token: string;

  daily_garant_id: string;
}

export interface TokenDto {
  tokenType: string;
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
  expirationMillis?: number;
}
