import Elysia from "elysia";
import { assetsController } from "./assets/controller";
import { usersController } from "./users/controller";
import { permissionsController } from "./permissions/controller";

export const apiController = new Elysia({
    prefix: "/api",
})
    .use(assetsController)
    .use(usersController)
    .use(permissionsController)
