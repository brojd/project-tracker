import { Component } from '@angular/core';
import template from './pt-employee.template.html';
import EmployeeService from '../../services/employee.service';
import employeeModel from '../../models/employee';
import styles from './pt-employee.stylesheet.scss';
import '../programmer.jpg';
import { locations } from '../../../../../config';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'pt-employee',
  template: template,
  styles: [styles]
})
export class PtEmployeeComponent {
  
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
    this.employee = employeeModel;
    this.componentReady = false;
  }
  
  ngOnInit() {
    this.employeeService.getCurrentEmployee().subscribe(
      employee => {
        const location = locations.filter(location => location.Id === employee.LocationId)[0];
        this.employee = Object.assign(employee, {Location: location});
        forkJoin(
          this.employeeService.getAllSkills(),
          this.employeeService.getEmployeeSkills(employee.Id)
        ).subscribe(
          data => {
            this.allSkills = data[0];
            this.employeeSkills = data[1];
            this.componentReady = true;
          }
        )
      },
      err => console.log(err)
    )
  }
}
