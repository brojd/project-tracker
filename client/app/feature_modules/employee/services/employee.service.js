import { Injectable } from '@angular/core';
import { HttpWrapper } from '../../../core/services/HttpWrapper.service';
import { UserService } from '../../../auth/services/user/user.service';
import { API_URL } from '../../../../config';

@Injectable()
export default class EmployeeService {
  
  constructor(http: HttpWrapper, userService: UserService) {
    this._http = http;
    this.userService = userService;
  }
  
  getAllEmployees() {
    return this._http
      .get(`${API_URL}/employees`)
      .map(res => res.json());
  }
  
  getEmployeeById(id) {
    return this._http
      .get(`${API_URL}/employees/${id}`)
      .map(res => res.json());
  }
  
  getCurrentEmployee() {
    const userId = this.userService.getUserId();
    return this._http
      .get(`${API_URL}/employees/${userId}`)
      .map(res => res.json());
  }
  
  addNewEmployee(employee) {
    return this._http
      .post(`${API_URL}/employees`, employee)
      .map(res => res.json());
  }
  
  updateEmployee(employee) {
    return this._http
      .put(`${API_URL}/employees`, employee)
      .map(res => res.json())
  }
  
  deleteEmployee(id) {
    return this._http
      .delete(`${API_URL}/employees/${id}`)
      .map(res => res.json())
  }
  
  getAllSkills() {
    return this._http
      .get(`${API_URL}/skills`)
      .map(res => res.json());
  }
  
  getEmployeeSkills(employeeId) {
    return this._http
      .get(`${API_URL}/skills/${employeeId}`)
      .map(res => res.json());
  }
  
  changeEmployeeSkillLevel(newLevelId, skillId, employeeId) {
    const obj = {
      SkillId: skillId,
      LevelId: newLevelId,
      EmployeeId: employeeId
    };
    return this._http
      .put(`${API_URL}/skills`, obj)
      .map(res => res.json());
  }
  
  addEmployeeSkill(skillObj) {
    return this._http
      .post(`${API_URL}/skills`, skillObj)
      .map(res => res.json());
  }
  
  deleteEmployeeSkill(skillId, employeeId) {
    return this._http
      .delete(`${API_URL}/skills?id=${skillId}&empId=${employeeId}`)
      .map(res => res.json());
  }
  
}
