import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './pt-employee-modal.template.html';
import styles from './pt-employee-modal.stylesheet.scss';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import EmployeeService from '../../../employee/services/employee.service';
import { locations } from '../../../../../config';
import { validatorFactory } from '../../../../validator';

@Component({
  selector: 'pt-employee-modal',
  template: template,
  styles: [styles]
})
export class PtEmployeeModalComponent {
  
  @Input() employee;
  @Output() onCloseModal = new EventEmitter();
  
  constructor(employeeService: EmployeeService, fb: FormBuilder) {
    this.employeeService = employeeService;
    this.timesheetExist = false;
    this.fb = fb;
    this.locations = locations;
  }
  
  handleLocationChosen(location) {
    this.newEmployee.Location = location;
    this.newEmployee.LocationId = location.Id;
    this.locationFilter = '';
  }
  
  closeModal(e) {
    e.preventDefault();
    this.onCloseModal.emit(this.employee);
  }
  
  ngOnInit() {
    this.newEmployee = Object.assign({}, this.employee);
    this.form = this.fb.group({
      'Email': [this.newEmployee.Email, [Validators.required, validatorFactory('email')]],
      'Birthday': [this.newEmployee.Birthday.substring(0, 10), Validators.required],
      'Address': [this.newEmployee.Address],
      'Skype': [this.newEmployee.Skype],
      'Phone': [this.newEmployee.Phone],
      'locationFilter': ['']
    });
  }
  
  onSubmit() {
    let employeeToSave = Object.assign(
      this.employee,
      this.form.value,
      { LocationId: this.newEmployee.LocationId, Birthday: new Date(this.form.value.Birthday) });
    let projectIds = [];
    employeeToSave.Projects.forEach(project => projectIds.push(project.Id));
    employeeToSave.Projects = projectIds;
    delete employeeToSave.locationFilter;
    this.employeeService.updateEmployee(employeeToSave).subscribe(
      (updatedEmployee) => this.onCloseModal.emit(updatedEmployee),
      err => console.log(err)
    );
  }
  
}
