import { Component, Input } from '@angular/core';
import template from './pt-employee-details.template.html';
import styles from './pt-employee-details.stylesheet.scss';
import { locations } from '../../../../../config';

@Component({
  selector: 'pt-employee-details',
  template: template,
  styles: [styles]
})
export class PtEmployeeDetailsComponent {
  
  @Input() employee;
  @Input() allSkills;
  @Input() employeeSkills;
  
  constructor() {
    this.modalVisible = false;
  }
  
  handleCloseModal(updatedEmployee) {
    const location = locations.filter(location => location.Id === updatedEmployee.LocationId)[0];
    this.employee = Object.assign(updatedEmployee, {Location: location});
    this.modalVisible = false;
  }
  
}
