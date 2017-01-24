import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './pt-timesheet-input.template.html';
import styles from './pt-timesheet-input.stylesheet.scss';
import Timesheet from '../../models/timesheet';

@Component({
  selector: 'pt-timesheet-input',
  template: template,
  styles: [styles]
})
export class PtTimesheetInputComponent {
  
  @Input() currentDate;
  @Input() ticket;
  @Output() onTimesheetChange = new EventEmitter();
  
  constructor() {
    this.currentTimesheet = {};
    this.timesheetExist = false
  }
  
  setCurrentTimesheet(date, ticket) {
    let timesheetExist = false;
    ticket.TimeSheets.forEach(timesheet => {
      let timesheetDate = new Date(timesheet.Date);
      let currentDate = new Date(date);
      timesheetDate.setHours(0, 0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0, 0);
      if (timesheetDate.getTime() === currentDate.getTime()) {
        this.currentTimesheet = timesheet;
        this.timesheetExist = true;
      }
    });
    return timesheetExist
  }
  
  passTimesheetValue(loggedHours) {
    let newTimesheet;
    this.setCurrentTimesheet(this.currentDate, this.ticket);
    if (loggedHours < 0) {
      this.currentTimesheet.LoggedTime = 0;
      newTimesheet = new Timesheet(this.ticket.Id, 0, this.currentDate, '');
    } else {
      this.currentTimesheet.LoggedTime = loggedHours;
      newTimesheet = new Timesheet(this.ticket.Id, loggedHours, this.currentDate, '');
    }
    const isNew = !this.timesheetExist;
    const timesheet = isNew ? newTimesheet : this.currentTimesheet;
    const data = {
      isNew,
      timesheet
    };
    this.onTimesheetChange.emit(data);
    if (isNew) {
      this.ticket.TimeSheets.push(newTimesheet);
    }
    this.timesheetExist = true;
  }
  
  ngOnInit() {
    this.setCurrentTimesheet(this.currentDate, this.ticket);
    this.commented = this.currentTimesheet.Comment ? this.currentTimesheet.Comment.split(' ').join('').length > 0 : false;
  }
}
