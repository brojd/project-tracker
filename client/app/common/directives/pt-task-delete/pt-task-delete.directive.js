import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import TaskService from '../../../feature_modules/task/services/task.service';

@Directive({
  selector: '[pt-task-delete]'
})
export class PtTaskDeleteDirective {
  
  @Input() taskId;
  @Input() redirectToHome;
  @Output() onDeletedTask = new EventEmitter();
  
  constructor(taskService: TaskService, route: ActivatedRoute, router: Router, location: Location) {
    this.taskService = taskService;
    this.route = route;
    this.router = router;
    this.location = location;
  }
  
  @HostListener('click') onClick() {
    let proceedDelete = confirm('Do you want to delete the task?');
    if (proceedDelete) {
      this.taskService.deleteTask(this.taskId).subscribe(
        () => {
          this.onDeletedTask.emit({'success': true});
          if (this.redirectToHome) {
            this.router.navigate(['']);
          }
        },
        err => this.onDeletedTask.emit({'success': false})
      )
    } else {
      this.location.back();
    }
  }
  
}
