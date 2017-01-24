import { PtTimesheetsComponent } from '../feature_modules/timesheets/components/pt-timesheets/pt-timesheets.component';
import { PtDashboardComponent } from '../feature_modules/dashboard/components/pt-dashboard/pt-dashboard.component';
import { PtEmployeeComponent } from '../feature_modules/employee/components/pt-employee/pt-employee.component';
import { PtProjectComponent } from '../feature_modules/project/components/pt-project/pt-project.component';
import { PtTaskInfoComponent } from '../feature_modules/task/components/pt-task-info/pt-task-info.component';
import { PtTaskEditComponent } from '../feature_modules/task/components/pt-task-edit/pt-task-edit.component';
import { PtTaskNewComponent } from '../feature_modules/task/components/pt-task-new/pt-task-new.component';
import { PtAdminComponent } from '../feature_modules/admin/components/pt-admin/pt-admin.component';
import { PtAdminEmployeesComponent } from '../feature_modules/admin/components/pt-admin-employees/pt-admin-employees.component';
import { PtAdminAddEmployeeComponent } from '../feature_modules/admin/components/pt-admin-add-employee/pt-admin-add-employee.component';
import { PtAdminEditEmployeeComponent } from '../feature_modules/admin/components/pt-admin-edit-employee/pt-admin-edit-employee.component';
import { PtAdminProjectsComponent } from '../feature_modules/admin/components/pt-admin-projects/pt-admin-projects.component';
import { PtAdminAddProjectComponent } from '../feature_modules/admin/components/pt-admin-add-project/pt-admin-add-project.component';
import { PtAdminEditProjectComponent } from '../feature_modules/admin/components/pt-admin-edit-project/pt-admin-edit-project.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { isAdminGuard } from './guards/isAdmin.guard';
import { isAdminOrPMGuard } from './guards/isAdminOrPM.guard';

export const routes = [
  
  // Logged out users
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  
  // Logged in users
  { path: '', component: PtTimesheetsComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  { path: 'dashboard/:id', component: PtDashboardComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  { path: 'employee', component: PtEmployeeComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  { path: 'project/:id', component: PtProjectComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  { path: 'task/new', component: PtTaskNewComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  { path: 'task/edit/:id', component: PtTaskEditComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  { path: 'task/info/:id', component: PtTaskInfoComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  
  // PM or Admin
  { path: 'admin/projects', component: PtAdminProjectsComponent, pathMatch: 'full', canActivate: [LoggedInGuard, isAdminOrPMGuard] },
  { path: 'admin/projects/add', component: PtAdminAddProjectComponent, pathMatch: 'full', canActivate: [LoggedInGuard, isAdminOrPMGuard] },
  { path: 'admin/projects/edit/:id', component: PtAdminEditProjectComponent, pathMatch: 'full', canActivate: [LoggedInGuard, isAdminOrPMGuard] },
  
  // Admin
  { path: 'admin', component: PtAdminComponent, pathMatch: 'full', canActivate: [LoggedInGuard, isAdminGuard] },
  { path: 'admin/employees', component: PtAdminEmployeesComponent, pathMatch: 'full', canActivate: [LoggedInGuard, isAdminGuard] },
  { path: 'admin/employees/add', component: PtAdminAddEmployeeComponent, pathMatch: 'full', canActivate: [LoggedInGuard, isAdminGuard] },
  { path: 'admin/employees/edit/:id', component: PtAdminEditEmployeeComponent, pathMatch: 'full', canActivate: [LoggedInGuard, isAdminGuard] }
  
];
