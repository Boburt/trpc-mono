

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
