import { Component, Input } from '@angular/core';
import template from './pt-project-info.template.html';
import styles from './pt-project-info.stylesheet.scss';

@Component({
  selector: 'pt-project-info',
  template: template,
  styles: [styles]
})
export class PtProjectInfoComponent {
  
  @Input() project;
  
  constructor() {}
  
}
