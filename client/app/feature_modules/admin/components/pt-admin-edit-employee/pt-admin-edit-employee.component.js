import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import template from './pt-admin-edit-employee.template.html';
import styles from './pt-admin-edit-employee.stylesheet.scss';
import employeeModel from '../../../employee/models/employee';
import EmployeeService from '../../../employee/services/employee.service';
import { ActivatedRoute } from "@angular/router";
import { locations, positions } from '../../../../../config';
import { validatorFactory } from '../../../../validator';

@Component({
  selector: 'pt-admin-edit-employee',
  template: template,
  styles: [styles]
})
export class PtAdminEditEmployeeComponent {
  
  constructor(employeeService: EmployeeService, route: ActivatedRoute, fb: FormBuilder, location: Location) {
    this.route = route;
    this.location = location;
    this.employeeService = employeeService;
    this.employee = employeeModel;
    this.locations = locations;
    this.positions = positions;
  
    this.form = fb.group({
      'First': ['', Validators.required],
      'Last': ['', Validators.required],
      'Email': ['', [Validators.required, validatorFactory('email')]],
      'Password': ['', Validators.required],
      'Birthday': ['', Validators.required],
      'Address': [''],
      'Skype': [''],
      'Phone': [''],
      'ImageUrl': [''],
      'locationFilter': [''],
      'positionFilter': ['']
    });
  }
  
  handleLocationChosen(location) {
    this.employee.Location = location;
    this.employee.LocationId = location.Id;
  }
  
  handlePositionChosen(position) {
    this.employee.Position = position;
    this.employee.PositionId = position.Id;
  }
  
  ngOnInit() {
    this.subscription = this.route
      .params
      .subscribe(params => {
        this.employeeService.getEmployeeById(params.id).subscribe(
          employee => {
            this.employee = employee;
            this.employee.Position = positions.filter(position => position.Id === this.employee.PositionId)[0];
            this.employee.Location = locations.filter(location => location.Id === this.employee.LocationId)[0];
            this.form.patchValue({
              'First': employee.First,
              'Last': employee.Last,
              'Email': employee.Email,
              'Password': employee.Password,
              'Birthday': employee.Birthday.substring(0, 10),
              'Address': employee.Address,
              'Skype': employee.Skype,
              'Phone': employee.Phone,
              'ImageUrl': employee.ImageUrl
            });
          },
          err => console.log(err)
        );
      });
  }
  
  onSubmit() {
    let employeeToSave = Object.assign(
      this.employee,
      this.form.value,
    );
    let projectIds = [];
    employeeToSave.Projects.forEach(project => projectIds.push(project.Id));
    employeeToSave.Projects = projectIds;
    delete employeeToSave.locationFilter;
    delete employeeToSave.positionFilter;
    employeeToSave.Birthday = new Date(employeeToSave.Birthday);
    this.employeeService.updateEmployee(employeeToSave).subscribe(
      () => this.location.back(),
      err => console.log(err)
    )
  }
  
  
}
