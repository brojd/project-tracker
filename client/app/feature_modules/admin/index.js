import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PtCommonModule } from '../../common';
import { PtAdminComponent } from './components/pt-admin/pt-admin.component';
import { PtAdminEmployeesComponent } from './components/pt-admin-employees/pt-admin-employees.component';
import { PtAdminAddEmployeeComponent } from './components/pt-admin-add-employee/pt-admin-add-employee.component';
import { PtAdminEditEmployeeComponent } from './components/pt-admin-edit-employee/pt-admin-edit-employee.component';
import { PtAdminProjectsComponent } from './components/pt-admin-projects/pt-admin-projects.component';
import { PtAdminAddProjectComponent } from './components/pt-admin-add-project/pt-admin-add-project.component';
import { PtAdminEditProjectComponent } from './components/pt-admin-edit-project/pt-admin-edit-project.component';
import { PtEmployeeDeleteDirective } from './directives/pt-employee-delete.directive';
import { PtProjectDeleteDirective } from './directives/pt-project-delete.directive';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PtCommonModule ],
  declarations: [ PtAdminComponent, PtAdminEmployeesComponent, PtAdminProjectsComponent, PtAdminAddEmployeeComponent,
    PtAdminEditEmployeeComponent, PtEmployeeDeleteDirective, PtProjectDeleteDirective, PtAdminAddProjectComponent,
    PtAdminEditProjectComponent ],
  exports:      [ PtAdminComponent, PtAdminEmployeesComponent, PtAdminProjectsComponent, PtAdminAddEmployeeComponent,
    PtAdminEditEmployeeComponent, PtAdminAddProjectComponent, PtAdminEditProjectComponent ]
})
export class AdminModule { }
