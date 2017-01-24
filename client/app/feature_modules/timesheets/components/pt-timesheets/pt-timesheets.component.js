import { Component } from '@angular/core';
import template from './pt-timesheets.template.html';
import { TimesheetsService } from '../../services/timesheets.service';
import _ from 'lodash';
import styles from './pt-timesheets.stylesheet.scss';
import Timesheet from '../../models/timesheet';

@Component({
  selector: 'pt-timesheets',
  template: template,
  styles: [styles]
})
export class PtTimesheetsComponent {
  
  constructor(timesheetsService: TimesheetsService) {
    this.timesheetsService = timesheetsService;
    this.currentSunday = '';
    this.allDates = [];
    this.modalVisible = false;
    this.componentReady = false;
  }
  
  generateDates(currentSunday) {
    let allDates = [];
    let currentDay = currentSunday;
    const createNextDay = (currentDay) => {
      let nextDay = new Date(currentDay);
      nextDay.setDate(currentDay.getDate() - 1);
      return nextDay;
    };
    _.times(6, () => {
      allDates.unshift(createNextDay(currentDay));
      currentDay = createNextDay(currentDay);
    });
    allDates.push(currentSunday);
    this.allDates = allDates;
    this.currentSunday = currentSunday;
  }
  
  decreaseDate() {
    let lastSunday = new Date(this.currentSunday.setDate(this.currentSunday.getDate() - 7));
    this.generateDates(lastSunday);
  }
  
  increaseDate() {
    let nextSunday = new Date(this.currentSunday.setDate(this.currentSunday.getDate() + 7));
    this.generateDates(nextSunday);
  }
  
  isDateActual() {
    let currentSunday = new Date();
    currentSunday.setDate(currentSunday.getDate() + (7 + 7 - currentSunday.getDay()) % 7);
    return this.currentSunday.getDate() === currentSunday.getDate();
  }
  
  isSatOrSun(date) {
    return date.getDay() === 6 || date.getDay() === 0;
  }
  
  saveTimesheet(data) {
    if (data.isNew) {
      this.timesheetsService.saveNewTimesheet(data.timesheet).subscribe(
        () => {
          this.timesheetsService.getUserProjects().subscribe(
            user => this.projects = user.Projects,
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    } else {
      this.timesheetsService.updateTimesheet(data.timesheet).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }
  }
  
  getTotalHours(project, date) {
    let hours = 0;
    project.Tickets.forEach(ticket => {
      ticket.TimeSheets.forEach(timesheet => {
        let timesheetDate = new Date(timesheet.Date);
        let currentDate = new Date(date);
        timesheetDate.setHours(0, 0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0, 0);
        if (timesheetDate.getTime() === currentDate.getTime()) {
          hours += timesheet.LoggedTime;
        }
      });
    });
    return hours;
  }
  
  setCurrentTimesheet(date, ticket) {
    let existingTimesheet = {};
    let timesheetExist = false;
    ticket.TimeSheets.forEach(timesheet => {
      let timesheetDate = new Date(timesheet.Date);
      let currentDate = new Date(date);
      timesheetDate.setHours(0, 0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0, 0);
      if (timesheetDate.getTime() === currentDate.getTime()) {
        timesheetExist = true;
        existingTimesheet = timesheet;
      }
    });
    this.currentTimesheet = timesheetExist ? existingTimesheet : new Timesheet(ticket.Id, 0, date, '');
  }
  
  openModal(date, ticket) {
    this.setCurrentTimesheet(date, ticket);
    this.modalVisible = true;
  }
  
  handleModalClosed(timesheet) {
    this.modalVisible = false;
    let isTimesheetNew = timesheet.Id ? false : true;
    if (isTimesheetNew) {
      this.timesheetsService.saveNewTimesheet(timesheet).subscribe(
        () => {
          this.timesheetsService.getUserProjects().subscribe(
            user => this.projects = user.Projects,
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    } else {
      this.timesheetsService.updateTimesheet(timesheet).subscribe(
        () => {
          this.timesheetsService.getUserProjects().subscribe(
            user => this.projects = user.Projects,
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    }
  }
  
  ngOnInit() {
    this.timesheetsService.getUserProjects().subscribe(
      user => {
        this.projects = user.Projects;
        this.componentReady = true;
      },
      err => console.log(err)
    );
    let currentSunday = new Date();
    currentSunday.setDate(currentSunday.getDate() + (7 + 7 - currentSunday.getDay()) % 7);
    this.generateDates(currentSunday);
  }
  
}
