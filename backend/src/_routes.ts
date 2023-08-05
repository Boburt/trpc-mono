import { permissionsRouter } from "./modules/permissions/route";
import { rolesRouter } from "./modules/roles/route";
import { publicRouter } from "./trpc";

export const router = publicRouter({
  permissions: permissionsRouter,
  roles: rolesRouter,
});

export type Router = typeof router;
