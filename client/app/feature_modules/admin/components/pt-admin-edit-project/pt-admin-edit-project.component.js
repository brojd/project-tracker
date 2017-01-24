import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import template from './pt-admin-edit-project.template.html';
import styles from './pt-admin-edit-project.stylesheet.scss';
import { ProjectService } from '../../../project/services/project.service';

@Component({
  selector: 'pt-admin-edit-project',
  template: template,
  styles: [styles]
})
export class PtAdminEditProjectComponent {
  
  constructor(projectService: ProjectService, fb: FormBuilder, location: Location, route: ActivatedRoute) {
    this.projectService = projectService;
    this.location = location;
    this.project = {};
    this.route = route;
    
    this.form = fb.group({
      'Name': ['', Validators.required],
      'Description': ['', Validators.required],
      'CustomerName': ['', Validators.required],
      'StartDate': ['', Validators.required],
      'EndDate': ['', Validators.required],
      'ImageUrl': [''],
    });
  }
  
  onSubmit() {
    let projectToSave = Object.assign({}, this.form.value);
    projectToSave.StartDate = new Date(projectToSave.StartDate);
    projectToSave.EndDate = new Date(projectToSave.EndDate);
    projectToSave.Id = this.project.Id;
    debugger;
    this.projectService.updateProject(projectToSave).subscribe(
      () => this.location.back(),
      err => console.log(err)
    );
  }
  
  ngOnInit() {
    this.subscription = this.route
      .params
      .subscribe(params => {
        this.projectService.getProject(params.id).subscribe(
          project => {
            this.project = project;
            this.form.patchValue({
              'Name': project.Name,
              'Description': project.Description,
              'CustomerName': project.CustomerName,
              'StartDate': project.StartDate.substring(0, 10),
              'EndDate': project.EndDate.substring(0, 10),
              'ImageUrl': project.ImageUrl
            });
          },
          err => console.log(err)
        );
      });
  }
  
}
