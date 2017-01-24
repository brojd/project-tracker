import { Component } from '@angular/core';
import template from './pt-dashboard.template.html';
import { ActivatedRoute, Router } from "@angular/router";
import DashboardService from '../../services/dashboard.service';
import EmployeeService from '../../../employee/services/employee.service';
import TaskService from '../../../task/services/task.service';
import { ticketStatuses } from '../../../../../config';
import styles from './pt-dashboard.stylesheet.scss';
import projectModel from '../../../project/models/project';

@Component({
  selector: 'pt-dashboard',
  template: template,
  styles: [styles]
})
export class PtDashboardComponent {
  
  constructor(dashboardService: DashboardService, route: ActivatedRoute,  router: Router,
              employeeService: EmployeeService, taskService: TaskService) {
    this.route = route;
    this.router = router;
    this.dashboardService = dashboardService;
    this.employeeService = employeeService;
    this.taskService = taskService;
    this.ticketStatuses = ticketStatuses;
    this.project = projectModel;
    this.tickets = projectModel.Tickets;
    this.draggedTicket = {};
    this.reporterFullNames = [];
    this.dragOverStyle = {};
    this.componentReady = false;
  }
  
  ticketsWithStatusId(tickets, statusId) {
    return tickets.filter(ticket => ticket.StatusId === statusId);
  }
  
  setReporterFullNames(ticketId, reporterId) {
    this.employeeService.getEmployeeById(reporterId).subscribe(
      employee => {
        if (!this.reporterFullNames.filter(obj => obj.ticketId === ticketId).length) {
          let objToSave = {
            reporterFullName: employee.FullName,
            ticketId: ticketId
          };
          this.reporterFullNames.push(objToSave);
        }
      },
      err => console.log(err)
    );
  }
  
  redirectToNewTask() {
    this.router.navigate(['task/new']);
  }
  
  getReporterFullName(ticketId) {
    let reporterObj = this.reporterFullNames.filter(obj => obj.ticketId === ticketId)[0];
    return reporterObj ? reporterObj.reporterFullName : '';
  }
  
  deleteTaskFromView(taskId) {
    let ticketsCopy = this.tickets.slice();
    ticketsCopy = ticketsCopy.filter(ticket => ticket.Id !== taskId);
    this.tickets = ticketsCopy;
  }
  
  onDrop(event) {
    this.taskService.updateTask(this.draggedTicket).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    event.preventDefault();
  }
  
  allowDrop(event) {
    event.preventDefault();
  }
  
  changeTicketStatus(ticket, statusId) {
    ticket.StatusId = statusId;
  }
  
  ngOnInit() {
    this.subscription = this.route
      .params
      .subscribe(params => {
        this.dashboardService.getCurrentProject(Number(params.id)).subscribe(
          project => {
            if (project) {
              this.project = project;
              this.tickets = project.Tickets;
              this.tickets.forEach(ticket => {
                this.setReporterFullNames(ticket.Id, ticket.ReporterId);
              });
            }
            this.componentReady = true;
          },
          err => console.log(err)
        );
      });
  }
}
