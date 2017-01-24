import { Injectable } from '@angular/core';
import { HttpWrapper } from '../../../core/services/HttpWrapper.service';
import { UserService } from '../../../auth/services/user/user.service';
import { API_URL } from '../../../../config';

@Injectable()
export class TimesheetsService {
  
  constructor(http: HttpWrapper, userService: UserService) {
    this._http = http;
    this.userService = userService;
  }
  
  getUserProjects() {
    let userId = this.userService.getUserId();
    return this._http
      .get(`${API_URL}/employees/${userId}`)
      .map(res => res.json());
  }
  
  saveNewTimesheet(timesheet) {
    return this._http
      .post(`${API_URL}/timesheets`, timesheet)
      .map(res => res.json() );
  }
  
  updateTimesheet(timesheet) {
    let timesheetToSave = Object.assign({}, timesheet);
    timesheetToSave.TaskId = timesheetToSave.TicketId;
    delete timesheetToSave.TicketId;
    return this._http
      .put(`${API_URL}/timesheets`, timesheetToSave)
      .map(res => res.json());
  }
  
  deleteTimesheet(id) {
    return this._http
      .delete(`${API_URL}/employees/${id}`)
      .map(res => res.json());
  }
  
}
