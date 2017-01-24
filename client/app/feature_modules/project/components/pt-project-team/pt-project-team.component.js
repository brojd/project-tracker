import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../auth/services/user/user.service';
import template from './pt-project-team.template.html';
import styles from './pt-project-team.stylesheet.scss';
import _ from 'lodash/lodash';

@Component({
  selector: 'pt-project-team',
  template: template,
  styles: [styles]
})
export class PtProjectTeamComponent {
  
  @Input() team;
  @Input() allEmployees;
  @Output() onMemberChosen = new EventEmitter();
  @Output() onMemberDeleted = new EventEmitter();
  
  constructor(userService: UserService) {
    this.userService = userService;
    this.team = [];
    this.membersFilter = '';
  }
  
  handleMemberChosen(member) {
    this.onMemberChosen.emit(member);
    this.membersFilter = '';
  }
  
  deleteMember(id) {
    this.onMemberDeleted.emit(id)
  }
  
  filterEmployees(employees) {
    return _.differenceBy(this.allEmployees, this.team, 'Id');
  }
  
  ngOnInit() {
    this.currentUserRole = this.userService.getCurrentUserRole();
  }
  
}
