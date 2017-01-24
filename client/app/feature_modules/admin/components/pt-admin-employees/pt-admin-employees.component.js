import { Component } from '@angular/core';
import template from './pt-admin-employees.template.html';
import EmployeeService from '../../../employee/services/employee.service';
import styles from './pt-admin-employees.stylesheet.scss';

@Component({
  selector: 'pt-admin',
  template: template,
  styles: [styles]
})
export class PtAdminEmployeesComponent {
  
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
    this.employees = [];
    this.filterText = '';
    this.componentReady = false;
  }
  
  handleDeleteEmployee(res) {
    if (res.success) {
      this.employees = this.employees.filter(employee => employee.Id !== res.employeeId);
    }
  }
  
  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe(
      employees => {
        this.componentReady = true;
        this.employees = employees
      },
      err => console.log(err)
    );
  }
  
}
