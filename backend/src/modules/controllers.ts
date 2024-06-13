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
import { manufacturersController } from "./manufacturers/controller";
import { manufacturersCategoriesController } from "./manufacturers_categories/controller";
import { spTicketCategoriesController } from "./sp_ticket_categories/controller";
import { spTicketStatusesController } from "./sp_ticket_statuses/controller";
import { spTicketsController } from "./sp_tickets/controller";
import { spTicketTimelineController } from "@backend/modules/sp_ticket_timeline/controller";
import { formsController } from "./forms/controller";
import { formsSentItemsController } from "./form_sent_items/controller";
import { ManufacturersUsersController } from "./manufacturers_users/controller";
import { spTicketCommentsController } from "./sp_ticket_comments/controller";
import { ConversationsController } from "./conversations/controller";
import { productsController } from "./products/controller";
import { uploadsController } from "./uploads/controller";

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
  .use(manufacturersPropertiesCategoriesController)
  .use(manufacturersController)
  .use(manufacturersCategoriesController)
  .use(spTicketCategoriesController)
  .use(spTicketStatusesController)
  .use(spTicketsController)
  .use(spTicketTimelineController)
  .use(formsController)
  .use(formsSentItemsController)
  .use(ManufacturersUsersController)
  .use(spTicketCommentsController)
  .use(ConversationsController)
  .use(productsController)
  .use(uploadsController);
