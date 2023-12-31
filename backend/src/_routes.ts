import { assetsRouter } from "./modules/assets/route";
import { citiesRouter } from "./modules/cities/route";
import { imageSizesRouter } from "./modules/image_sizes/route";
import { langsRouter } from "./modules/langs/route";
import { manufacturersRouter } from "./modules/manufacturers/route";
import { manufacturersCategoriesRouter } from "./modules/manufacturers_categories/route";
import { manufacturersPropertiesRouter } from "./modules/manufacturers_properties/route";
import { manufacturersPropertiesCategoriesRouter } from "./modules/manufacturers_properties_categories/route";
import { manufacturersReviewsRouter } from "./modules/manufacturers_reviews/route";
import { permissionsRouter } from "./modules/permissions/route";
import { rolesRouter } from "./modules/roles/route";
import { rolesPermissionsRouter } from "./modules/roles_permissions/route";
import { seoLinksRouter } from "./modules/seo_links/route";
import { sessionsRouter } from "./modules/sessions/route";
import { usersRouter } from "./modules/users/route";
import { usersPermissionsRouter } from "./modules/users_permissions/route";
import { usersRolesRouter } from "./modules/users_roles/route";
import { publicRouter } from "./trpc";
import { categoriesRouter } from "@backend/modules/categories/route";

export const router = publicRouter({
  permissions: permissionsRouter,
  roles: rolesRouter,
  rolesPermissions: rolesPermissionsRouter,
  users: usersRouter,
  usersPermissions: usersPermissionsRouter,
  usersRoles: usersRolesRouter,
  sessions: sessionsRouter,
  langs: langsRouter,
  categories: categoriesRouter,
  imageSizes: imageSizesRouter,
  manufacturers: manufacturersRouter,
  manufacturersCategories: manufacturersCategoriesRouter,
  assets: assetsRouter,
  cities: citiesRouter,
  seoLinks: seoLinksRouter,
  manufacturersPropertiesCategories: manufacturersPropertiesCategoriesRouter,
  manufacturersProperties: manufacturersPropertiesRouter,
  manufacturersReviews: manufacturersReviewsRouter,
});

export type Router = typeof router;
