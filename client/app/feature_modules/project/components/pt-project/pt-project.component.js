import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import template from './pt-project.template.html';
import { ProjectService } from '../../services/project.service';
import EmployeeService from '../../../employee/services/employee.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'pt-project',
  template: template
})
export class PtProjectComponent {
  
  constructor(projectService: ProjectService, route: ActivatedRoute, employeeService: EmployeeService) {
    this.projectService = projectService;
    this.employeeService = employeeService;
    this.route = route;
    this.project = {};
    this.componentReady = false;
  }
  
  handleMemberChosen(member) {
    this.projectService.addMemberToProject(this.project.Id, member).subscribe(
      addedMember => {
        this.team.push(addedMember);
      },
      err => console.log(err)
    );
  }
  
  handleMemberDeleted(memberId) {
    this.projectService.deleteMemberFromProject(this.project.Id, memberId).subscribe(
      () => {
        let teamCopy = this.team.slice();
        teamCopy = teamCopy.filter(member => member.Id !== memberId);
        this.team = teamCopy;
      },
      err => console.log(err)
    )
  }
  
  ngOnInit() {
    this.subscription = this.route
      .params
      .subscribe(params => {
        forkJoin(
          this.employeeService.getAllEmployees(),
          this.projectService.getProject(params.id),
          this.projectService.getProjectTeam(params.id)
        ).subscribe(
          data => {
            this.allEmployees = data[0];
            this.project = data[1];
            this.team = data[2];
            this.componentReady = true;
          }
        );
      });
  }
  
  
}
