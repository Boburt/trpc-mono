import { organizationRouter } from "./modules/organization/route";
import { permissionsRouter } from "./modules/permissions/route";
import { rolesRouter } from "./modules/roles/route";
import { rolesPermissionsRouter } from "./modules/roles_permissions/route";
import { sessionsRouter } from "./modules/sessions/route";
import { terminalsRouter } from "./modules/terminals/route";
import { usersRouter } from "./modules/users/route";
import { usersPermissionsRouter } from "./modules/users_permissions/route";
import { usersRolesRouter } from "./modules/users_roles/route";
import { usersTerminalsRouter } from "./modules/users_terminals/route";
import { usersWorkSchedulesRouter } from "./modules/users_work_schedules/route";
import { workSchedulesRouter } from "./modules/work_schedules/route";
import { publicRouter } from "./trpc";
import { workScheduleEntriesRouter } from "./modules/work_schedule_entries/route";
import { apiTokensRouter } from "./modules/api_tokens/route";
import { timesheetRouter } from "./modules/timesheet/route";
import { scheduledReportsRouter } from "./modules/scheduled_reports/route";

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
  workSchedules: workSchedulesRouter,
  sessions: sessionsRouter,
  usersWorkSchedules: usersWorkSchedulesRouter,
  workScheduleEntriesRouter: workScheduleEntriesRouter,
  apiTokensRouter: apiTokensRouter,
  timesheetRouter: timesheetRouter,
  scheduledReportsRouter: scheduledReportsRouter,
});

export type Router = typeof router;
