import { Injectable } from '@angular/core';
import { HttpWrapper } from '../../../core/services/HttpWrapper.service';
import { UserService } from '../../../auth/services/user/user.service';
import { API_URL } from '../../../../config';

@Injectable()
export default class DashboardService {
  
  constructor(http: HttpWrapper, userService: UserService) {
    this._http = http;
    this.userService = userService;
  }
  
  getCurrentProject(projectId) {
    const userId = this.userService.getUserId();
    return this._http
      .get(`${API_URL}/employees/${userId}`)
      .map(res => res.json())
      .map(user => user.Projects.filter(project => Number(project.Id) === Number(projectId))[0]);
  }
  
}
