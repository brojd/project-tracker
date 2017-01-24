import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { PtDropdownComponent } from './components/pt-dropdown/pt-dropdown.component';
import { PtSpinnerComponent } from './components/pt-spinner/pt-spinner.component';
import { PtTaskDeleteDirective } from './directives/pt-task-delete/pt-task-delete.directive';
import { FilterPipe } from './pipes/filter';
import { OpenedTicketsPipe } from './pipes/openedTickets';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ PtDropdownComponent, FilterPipe, PtTaskDeleteDirective, OpenedTicketsPipe, PtSpinnerComponent ],
  exports:      [ PtDropdownComponent, FilterPipe, PtTaskDeleteDirective, OpenedTicketsPipe, PtSpinnerComponent ]
})
export class PtCommonModule { }
