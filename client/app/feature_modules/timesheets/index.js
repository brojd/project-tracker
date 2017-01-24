import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { PtCommonModule } from '../../common';
import { PtTimesheetsComponent } from './components/pt-timesheets/pt-timesheets.component';
import { PtTimesheetInputComponent } from './components/pt-timesheet-input/pt-timesheet-input.component';
import { PtTimesheetModalComponent } from './components/pt-timesheet-modal/pt-timesheet-modal.component';
import { TimesheetsService } from './services/timesheets.service';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, PtCommonModule ],
  declarations: [ PtTimesheetsComponent, PtTimesheetInputComponent, PtTimesheetModalComponent ],
  exports:      [ PtTimesheetsComponent ],
  providers:    [ TimesheetsService ]
})
export class TimesheetsModule { }
