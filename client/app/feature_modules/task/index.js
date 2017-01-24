import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PtCommonModule } from '../../common';
import { PtTaskInfoComponent } from './components/pt-task-info/pt-task-info.component';
import { PtTaskEditComponent } from './components/pt-task-edit/pt-task-edit.component';
import { PtTaskNewComponent } from './components/pt-task-new/pt-task-new.component';
import TaskService from './services/task.service';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, PtCommonModule, ReactiveFormsModule ],
  declarations: [ PtTaskInfoComponent, PtTaskEditComponent, PtTaskNewComponent ],
  exports:      [ PtTaskInfoComponent, PtTaskEditComponent, PtTaskNewComponent ],
  providers:    [ TaskService ],
})
export class TaskModule { }
