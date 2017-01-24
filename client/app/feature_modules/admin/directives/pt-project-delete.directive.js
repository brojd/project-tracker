import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { ProjectService } from '../../project/services/project.service';

@Directive({
  selector: '[pt-project-delete]'
})
export class PtProjectDeleteDirective {
  
  @Input() projectId;
  @Input() redirectToHome;
  @Output() onDeletedProject = new EventEmitter();
  
  constructor(projectService: ProjectService, route: ActivatedRoute, router: Router, location: Location) {
    this.projectService = projectService;
    this.route = route;
    this.router = router;
    this.location = location;
  }
  
  @HostListener('click') onClick() {
    let proceedDelete = confirm('Do you want to delete the project?');
    if (proceedDelete) {
      this.projectService.deleteProject(this.projectId).subscribe(
        () => {
          this.onDeletedProject.emit({'success': true, projectId: this.projectId});
          if (this.redirectToHome) {
            this.router.navigate(['']);
          }
        },
        err => this.onDeletedProject.emit({'success': false})
      )
    } else {
      return false;
    }
  }
  
}
