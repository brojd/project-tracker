import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PtCommonModule } from '../../common';
import { PtProjectComponent } from './components/pt-project/pt-project.component';
import { PtProjectInfoComponent } from './components/pt-project-info/pt-project-info.component';
import { PtProjectTeamComponent } from './components/pt-project-team/pt-project-team.component';
import { ProjectService } from './services/project.service';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, PtCommonModule ],
  declarations: [ PtProjectComponent, PtProjectInfoComponent, PtProjectTeamComponent ],
  exports:      [ PtProjectComponent ],
  providers:    [ ProjectService ]
})
export class ProjectModule { }
