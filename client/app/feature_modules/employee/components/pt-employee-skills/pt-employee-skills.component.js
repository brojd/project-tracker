import { Component, Input } from '@angular/core';
import template from './pt-employee-skills.template.html';
import EmployeeService from '../../services/employee.service';
import styles from './pt-employee-skills.stylesheet.scss';
import { skillLevels } from '../../../../../config';
import _ from 'lodash/lodash';

@Component({
  selector: 'pt-employee-skills',
  template: template,
  styles: [styles]
})
export class PtEmployeeSkillsComponent {
  
  @Input() employee;
  @Input() allSkills;
  @Input() employeeSkills;
  
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
    this.employeeSkills = [];
    this.allSkills = [];
    this.skillLevels = skillLevels;
    this.newSkill = {};
    this.addFormVisible = false;
  }
  
  getSkillsToChoose() {
    return _.differenceBy(this.allSkills, this.employeeSkills, 'Id');
  }
  
  handleShowAddForm() {
    if (_.differenceBy(this.allSkills, this.employeeSkills, 'Id').length < 1) {
      alert('all skills added');
      return false;
    }
    this.addFormVisible = true;
  }
  
  handleLevelChange(newLevelId, skillId) {
    this.employeeService.changeEmployeeSkillLevel(newLevelId, skillId, this.employee.Id).subscribe(
      newSkill => {
        let newEmployeeSkills = this.employeeSkills.slice();
        let newLevelName = this.skillLevels.filter(level => level.Id === newSkill.LevelId)[0].Name;
        newEmployeeSkills = newEmployeeSkills.map(skill => {
          if (skill.Id === newSkill.Id) {
            let skillToUpdate = Object.assign(newSkill, {LevelName: newLevelName});
            return skillToUpdate;
          } else {
            return skill;
          }
        });
        this.employeeSkills = newEmployeeSkills;
        this.visibleSelectIndex = -1;
      },
      err => console.log(err)
    );
  }
  
  handleAddSkill() {
    if (!this.newSkill.SkillId || !this.newSkill.LevelId){
      alert('Please choose skill and level');
      return false;
    }
    let skillToAdd = Object.assign(this.newSkill, {EmployeeId: this.employee.Id});
    this.employeeService.addEmployeeSkill(skillToAdd).subscribe(
      newSkill => {
        this.employeeSkills.push(newSkill);
        this.newSkill = {};
        this.addFormVisible = false;
      },
      err => console.log(err)
    );
  }
  
  handleDeleteSkill(skill) {
    let toDelete = confirm('Do want to delete skill?');
    if (toDelete) {
      this.employeeService.deleteEmployeeSkill(skill.Id, this.employee.Id).subscribe(
        () => {
          let newEmployeeSkills = this.employeeSkills.filter(empSkill => empSkill.Id !== skill.Id);
          this.employeeSkills = newEmployeeSkills;
        },
        err => console.log(err)
      );
    }
  }
  
}
