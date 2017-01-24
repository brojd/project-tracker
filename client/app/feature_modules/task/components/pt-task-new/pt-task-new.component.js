import { Component } from '@angular/core';
import template from './pt-task-new.template.html';
import { Router } from '@angular/router';
import TaskService from '../../services/task.service';
import EmployeeService from '../../../employee/services/employee.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import styles from './pt-task-new.stylesheet.scss';
import { ticketStatuses, ticketTypes } from '../../../../../config';
import taskModel from '../../models/task';
import getEmployeeFullNameById from '../../../../helpers/getEmployeeFullNameById';

@Component({
  selector: 'pt-task-new',
  template: template,
  styles: [styles]
})
export class PtTaskNewComponent {
  
  constructor(taskService: TaskService, employeeService: EmployeeService, router: Router,
              fb: FormBuilder) {
    this.router = router;
    this.taskService = taskService;
    this.employeeService = employeeService;
    this.task = taskModel;
    this.ticketStatuses = ticketStatuses;
    this.ticketTypes = ticketTypes;
    this.projects = [];
    this.employees = [];
    this.getEmployeeFullNameById = getEmployeeFullNameById;
  
    let today = new Date();
    today = today.toISOString().substring( 0, 10);
    
    this.form = fb.group({
      'Name': ['', Validators.required],
      'ReporterId': [1, Validators.required],
      'ResponsibleId': [1, Validators.required],
      'ProjectId': [1, Validators.required],
      'Estimate': [1, Validators.required],
      'StartDate': [today, Validators.required],
      'StatusId': [1, Validators.required],
      'TypeId': [1, Validators.required],
      'Description': [''],
      'EndDate': [today],
      'reporterFilter': [''],
      'responsibleFilter': ['']
    });
  }
  
  handleReporterChosen(reporter) {
    this.task.ReporterId = reporter.Id;
    this.reportersFilter = '';
  }
  
  handleResponsibleChosen(responsible) {
    this.task.ResponsibleId = responsible.Id;
    this.responsibleFilter = '';
  }
  
  onSubmit() {
    let taskToSave = Object.assign(
      {},
      this.task,
      this.form.value,
      {
        StartDate: new Date(this.form.value.StartDate),
        EndDate: new Date(this.form.value.EndDate),
        ReporterId: this.task.ReporterId,
        ResponsibleId: this.task.ResponsibleId
      }
    );
    delete taskToSave.reporterFilter;
    delete taskToSave.responsibleFilter;
    this.taskService.saveNewTask(taskToSave).subscribe(
      (res) => {
        this.form.reset();
        this.router.navigate([`/task/info/${res.Id}`]);
      },
      err => console.log(err)
    );
  }
  
  ngOnInit() {
    this.taskService.getAllProjects().subscribe(
      projects => this.projects = projects,
      err => console.log(err)
    );
    this.employeeService.getAllEmployees().subscribe(
      employees => this.employees = employees,
      err => console.log(err)
    );
  }
}
