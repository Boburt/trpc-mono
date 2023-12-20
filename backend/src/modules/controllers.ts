import Elysia from "elysia";
import { assetsController } from "./assets/controller";
import { usersController } from "./users/controller";
import { permissionsController } from "./permissions/controller";
import { rolesController } from "./roles/controller";
import { rolesPermissionsController } from "./roles_permissions/controller";
import { langsController } from "./langs/controller";
import { citiesController } from "./cities/controller";
import { seoLinksController } from "./seo_links/controller";
import { imageSizesController } from "./image_sizes/controller";
import { categoriesController } from "./categories/controller";
import { manufacturersPropertiesController } from "./manufacturers_properties/controller";
import { manufacturersPropertiesCategoriesController } from "./manufacturers_properties_categories/controller";
import { usersRolesController } from "./users_roles/controller";

export const apiController = new Elysia({
  prefix: "/api",
})
  .use(assetsController)
  .use(usersController)
  .use(usersRolesController)
  .use(permissionsController)
  .use(rolesController)
  .use(rolesPermissionsController)
  .use(langsController)
  .use(citiesController)
  .use(seoLinksController)
  .use(imageSizesController)
  .use(categoriesController)
  .use(manufacturersPropertiesController)
  .use(manufacturersPropertiesCategoriesController);
