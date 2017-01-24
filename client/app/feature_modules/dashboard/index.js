import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PtCommonModule } from '../../common';
import { PtDashboardComponent } from './components/pt-dashboard/pt-dashboard.component';
import DashboardService from './services/dashboard.service';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, PtCommonModule ],
  declarations: [ PtDashboardComponent ],
  exports:      [ PtDashboardComponent ],
  providers:    [ DashboardService ]
})
export class DashboardModule { }
