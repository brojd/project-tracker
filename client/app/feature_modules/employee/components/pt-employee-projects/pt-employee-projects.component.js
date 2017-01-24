import { Component } from '@angular/core';
import template from './pt-employee-projects.template.html';
import { TimesheetsService } from '../../../timesheets/services/timesheets.service';
import styles from './pt-employee-projects.stylesheet.scss';

@Component({
  selector: 'pt-employee-projects',
  template: template,
  styles: [styles]
})
export class PtEmployeeProjectsComponent {
  
  constructor(timesheetsService: TimesheetsService) {
    this.timesheetsService = timesheetsService;
  }
  
  ngOnInit() {
    this.timesheetsService.getUserProjects().subscribe(
      user => this.projects = user.Projects,
      err => console.log(err)
    );
  }
  
}
