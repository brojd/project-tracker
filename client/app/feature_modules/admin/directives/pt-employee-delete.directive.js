import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import EmployeeService from '../../employee/services/employee.service';

@Directive({
  selector: '[pt-employee-delete]'
})
export class PtEmployeeDeleteDirective {
  
  @Input() employeeId;
  @Input() redirectToHome;
  @Output() onDeletedEmployee = new EventEmitter();
  
  constructor(employeeService: EmployeeService, route: ActivatedRoute, router: Router, location: Location) {
    this.employeeService = employeeService;
    this.route = route;
    this.router = router;
    this.location = location;
  }
  
  @HostListener('click') onClick() {
    let proceedDelete = confirm('Do you want to delete the employee?');
    if (proceedDelete) {
      this.employeeService.deleteEmployee(this.employeeId).subscribe(
        () => {
          this.onDeletedEmployee.emit({'success': true, employeeId: this.employeeId});
          if (this.redirectToHome) {
            this.router.navigate(['']);
          }
        },
        err => this.onDeletedEmployee.emit({'success': false})
      )
    } else {
      return false;
    }
  }
  
}
