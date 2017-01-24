import { Component } from '@angular/core';
import template from './pt-task-edit.template.html';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import TaskService from '../../services/task.service';
import EmployeeService from '../../../employee/services/employee.service';
import { ActivatedRoute } from "@angular/router";
import taskModel from '../../models/task';
import { ticketStatuses, ticketTypes } from '../../../../../config';
import getEmployeeFullNameById from '../../../../helpers/getEmployeeFullNameById';
import styles from './pt-task-edit.stylesheet.scss';
import { Location } from '@angular/common';

@Component({
  selector: 'pt-task-edit',
  template: template,
  styles: [styles]
})
export class PtTaskEditComponent {
  
  constructor(taskService: TaskService, employeeService: EmployeeService, route: ActivatedRoute, location: Location,
              fb: FormBuilder) {
    this.taskService = taskService;
    this.employeeService = employeeService;
    this.route = route;
    this.location = location;
    this.task = taskModel;
    this.ticketStatuses = ticketStatuses;
    this.ticketTypes = ticketTypes;
    this.projects = [];
    this.employees = [];
    this.getEmployeeFullNameById = getEmployeeFullNameById;
  
    this.form = fb.group({
      'Name': ['', Validators.required],
      'ReporterId': [1, Validators.required],
      'ResponsibleId': [1, Validators.required],
      'ProjectId': [1, Validators.required],
      'Estimate': [1, Validators.required],
      'StartDate': ['', Validators.required],
      'StatusId': [1, Validators.required],
      'TypeId': [1, Validators.required],
      'Description': [''],
      'EndDate': [''],
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
    this.taskService.updateTask(taskToSave).subscribe(
      () => this.location.back(),
      err => console.log(err)
    );
  }
  
  ngOnInit() {
    this.subscription = this.route
      .params
      .subscribe(params => {
        this.taskService.getTask(params.id)
          .subscribe(
            task => {
              let fetchedTask = Object.assign({}, task);
              this.task = fetchedTask;
              let today = new Date();
              today = today.toISOString().substring(0, 10);
              this.form.patchValue({
                'Name': fetchedTask.Name,
                'ReporterId': fetchedTask.ReporterId,
                'ResponsibleId': fetchedTask.ResponsibleId,
                'ProjectId': fetchedTask.ProjectId,
                'Estimate': fetchedTask.Estimate,
                'StartDate': fetchedTask.StartDate ? fetchedTask.StartDate.substring(0, 10) : today,
                'StatusId': fetchedTask.StatusId,
                'TypeId': fetchedTask.TypeId,
                'Description': fetchedTask.Description,
                'EndDate': fetchedTask.EndDate ? fetchedTask.EndDate.substring(0, 10) : today
              });
            },
            err => { console.log(err) }
          )
      });
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
