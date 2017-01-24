import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PtCommonModule } from '../../common';
import { PtEmployeeComponent } from './components/pt-employee/pt-employee.component';
import { PtEmployeeDetailsComponent } from './components/pt-employee-details/pt-employee-details.component';
import { PtEmployeeProjectsComponent } from './components/pt-employee-projects/pt-employee-projects.component';
import { PtEmployeeSkillsComponent } from './components/pt-employee-skills/pt-employee-skills.component';
import { PtEmployeeModalComponent } from './components/pt-employee-modal/pt-employee-modal.component';
import EmployeeService from './services/employee.service';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, PtCommonModule, ReactiveFormsModule ],
  declarations: [ PtEmployeeComponent, PtEmployeeDetailsComponent, PtEmployeeProjectsComponent,
    PtEmployeeSkillsComponent, PtEmployeeModalComponent ],
  exports:      [ PtEmployeeComponent ],
  providers:    [ EmployeeService ]
})
export class EmployeeModule { }
