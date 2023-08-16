import { organizationRouter } from "./modules/organization/route";
import { permissionsRouter } from "./modules/permissions/route";
import { rolesRouter } from "./modules/roles/route";
import { rolesPermissionsRouter } from "./modules/roles_permissions/route";
import { terminalsRouter } from "./modules/terminals/route";
import { usersRouter } from "./modules/users/route";
import { usersPermissionsRouter } from "./modules/users_permissions/route";
import { usersRolesRouter } from "./modules/users_roles/route";
import { usersTerminalsRouter } from "./modules/users_terminals/route";
import { publicRouter } from "./trpc";

export const router = publicRouter({
  permissions: permissionsRouter,
  roles: rolesRouter,
  rolesPermissions: rolesPermissionsRouter,
  organization: organizationRouter,
  terminals: terminalsRouter,
  users: usersRouter,
  usersPermissions: usersPermissionsRouter,
  usersRoles: usersRolesRouter,
  usersTerminals: usersTerminalsRouter,
});

export type Router = typeof router;
