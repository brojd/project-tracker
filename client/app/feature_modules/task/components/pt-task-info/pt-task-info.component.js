import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import template from './pt-task-info.template.html';
import TaskService from '../../services/task.service';
import styles from './pt-task-info.stylesheet.scss';
import taskModel from '../../models/task';
import '../../male.png';
import '../../female.jpg';

@Component({
  selector: 'pt-task-info',
  template: template,
  styles: [styles]
})
export class PtTaskInfoComponent {
  
  constructor(taskService: TaskService, route: ActivatedRoute, router: Router) {
    this.taskService = taskService;
    this.route = route;
    this.router = router;
    this.task = taskModel;
    this.componentReady = false;
  }
  
  isMale(name) {
    return name ? !name.endsWith('a') : true; // this should rely on property of Reporter/Responsible
  }
  
  ngOnInit() {
    this.subscription = this.route
      .params
      .subscribe(params => {
        this.taskService.getTask(params.id)
          .subscribe(
            task => {
              this.task = task;
              this.componentReady = true;
            },
            err => { console.log(err) }
          )
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
