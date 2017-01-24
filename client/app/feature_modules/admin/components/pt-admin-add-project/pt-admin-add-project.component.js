import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import template from './pt-admin-add-project.template.html';
import styles from './pt-admin-add-project.stylesheet.scss';
import { ProjectService } from '../../../project/services/project.service';

@Component({
  selector: 'pt-admin-add-project',
  template: template,
  styles: [styles]
})
export class PtAdminAddProjectComponent {
  
  constructor(projectService: ProjectService, fb: FormBuilder, location: Location) {
    this.projectService = projectService;
    this.location = location;
    this.project = {};
    
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
    this.projectService.addNewProject(projectToSave).subscribe(
      () => this.location.back(),
      err => console.log(err)
    );
  }
  
}
