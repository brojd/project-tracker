import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import template from './pt-admin-add-employee.template.html';
import styles from './pt-admin-add-employee.stylesheet.scss';
import EmployeeService from '../../../employee/services/employee.service';
import employeeModel from '../../../employee/models/employee';
import { locations, positions, defaultLocation, defaultPosition } from '../../../../../config';
import { validatorFactory } from '../../../../validator';

@Component({
  selector: 'pt-admin-add-employee',
  template: template,
  styles: [styles]
})
export class PtAdminAddEmployeeComponent {
  
  constructor(employeeService: EmployeeService, fb: FormBuilder, location: Location) {
    this.employeeService = employeeService;
    this.newEmployee = employeeModel;
    this.location = location;
    this.newEmployee.Position = defaultPosition;
    this.newEmployee.PositionId = defaultPosition.Id;
    this.newEmployee.Location = defaultLocation;
    this.newEmployee.LocationId = defaultLocation.Id;
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
    })
  }
  
  handleLocationChosen(location) {
    this.newEmployee.Location = location;
    this.newEmployee.LocationId = location.Id;
  }
  
  handlePositionChosen(position) {
    this.newEmployee.Position = position;
    this.newEmployee.PositionId = position.Id;
  }
  
  onSubmit() {
    let employeeToSave = Object.assign(
      {},
      this.form.value,
      { Projects: [], LocationId: this.newEmployee.LocationId, PositionId: this.newEmployee.PositionId}
    );
    delete employeeToSave.locationFilter;
    delete employeeToSave.positionFilter;
    this.employeeService.addNewEmployee(employeeToSave).subscribe(
      () => this.location.back(),
      err => console.log(err)
    )
  }
  
}
