import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './pt-timesheet-modal.template.html';
import styles from './pt-timesheet-modal.stylesheet.scss';

@Component({
  selector: 'pt-timesheet-modal',
  template: template,
  styles: [styles]
})
export class PtTimesheetModalComponent {
  
  @Input() timesheet;
  @Output() onCloseModal = new EventEmitter();
  
  constructor() {
    this.timesheetExist = false;
  }
  
  closeModal(e) {
    e.preventDefault();
    this.onCloseModal.emit(this.timesheet);
  }
  
  passLoggedHours(hours) {
    this.timesheet.LoggedTime = hours;
  }
  
  passComment(comment) {
    this.timesheet.Comment = comment;
  }
  
}
