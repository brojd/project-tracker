import { Component } from '@angular/core';
import template from './pt-admin-projects.template.html';
import { ProjectService } from '../../../project/services/project.service';
import styles from './pt-admin-projects.stylesheet.scss';

@Component({
  selector: 'pt-admin-projects',
  template: template,
  styles: [styles]
})
export class PtAdminProjectsComponent {
  
  constructor(projectService: ProjectService) {
    this.projectService = projectService;
    this.projects = [];
    this.filterText = '';
    this.componentReady = false;
  }
  
  handleDeleteProject(res) {
    if (res.success) {
      this.projects = this.projects.filter(project => project.Id !== res.projectId);
    }
  }
  
  ngOnInit() {
    this.projectService.getAllProjects().subscribe(
      projects => {
        this.componentReady = true;
        this.projects = projects
      },
      err => console.log(err)
    );
  }
  
}
