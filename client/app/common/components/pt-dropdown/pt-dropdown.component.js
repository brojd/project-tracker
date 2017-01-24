import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './pt-dropdown.template.html';
import styles from './pt-dropdown.stylesheet.scss';

@Component({
  selector: 'pt-dropdown',
  template: template,
  styles: [styles],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class PtDropdownComponent {
  
  @Input() items = [];
  @Input() labelProp = '';
  @Input() preventCloseClass = '';
  @Input() filterString = '';
  @Output() onItemChosen = new EventEmitter();
  
  
  constructor() {
    this.dropdownVisible = false;
  }
  
  onClick(event) {
    if (event.target.className.includes(this.preventCloseClass)) {
      this.dropdownVisible = true;
    } else {
      this.dropdownVisible = false;
    }
  }
  
  itemClicked(item) {
    this.dropdownVisible = false;
    this.onItemChosen.emit(item);
  }
  
}
