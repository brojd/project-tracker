import { Injectable } from '@angular/core';
import { HttpWrapper } from '../../../core/services/HttpWrapper.service';
import { API_URL } from '../../../../config';

@Injectable()
export class ProjectService {
  
  constructor(http: HttpWrapper) {
    this._http = http;
  }
  
  getAllProjects() {
    return this._http
      .get(`${API_URL}/projects`)
      .map(res => res.json());
  }
  
  getProject(id) {
    return this._http
      .get(`${API_URL}/projects/${id}`)
      .map(res => res.json());
  }
  
  getProjectTeam(projectId) {
    return this._http
      .get(`${API_URL}/team/${projectId}`)
      .map(res => res.json());
  }
  
  updateProject(project) {
    return this._http
      .put(`${API_URL}/projects`, project)
      .map(res => res.json());
  }
  
  deleteProject(id) {
    return this._http
      .delete(`${API_URL}/projects/${id}`)
      .map(res => res.json());
  }
  
  addNewProject(project) {
    return this._http
      .post(`${API_URL}/projects`, project)
      .map(res => res.json());
  }
  
  addMemberToProject(projectId, member) {
    const requestObj = {
      ProjectId: projectId,
      EmployeeId: member.Id
    };
    return this._http
      .post(`${API_URL}/team`, requestObj)
      .map(res => res.json());
  }
  
  deleteMemberFromProject(projectId, memberId) {
    return this._http
      .delete(`${API_URL}/team?model.projectId=${projectId}&model.employeeId=${memberId}`)
      .map(res => res.json());
  }
  
}
