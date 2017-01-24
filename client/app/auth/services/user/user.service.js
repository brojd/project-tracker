import { Injectable } from '@angular/core';
import { HttpWrapper } from '../../../core/services/HttpWrapper.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StorageService } from '../storage/storage.service';
import { adminId, positionPmId } from '../../../../config';
import { API_URL } from '../../../../config';

@Injectable()
export class UserService {

  _loggedIn = new BehaviorSubject(false);

  constructor(http: HttpWrapper, storage: StorageService) {
    this._http = http;
    this._storage = storage;

    if (!!this._storage.getAuthToken()) {
      this._loggedIn.next(true);
    }
  }

  login(credentials) {
    return this._http
      .post(`${API_URL}/employees/login`, JSON.stringify(credentials))
      .map(res => res.json())
      .map(res => {
        this._storage.setUserDetails(res.Id, res.First, res.Last, res.FullName, res.PositionId);
        this._storage.setAuthToken(res.Id); // this should be a real token generated on backend
        this._loggedIn.next(true);
        return res;
      })
  }

  logout() {
    this._storage.removeUserDetails();
    this._storage.removeAuthToken();
    this._loggedIn.next(false);
  }

  isLoggedIn() {
    return this._loggedIn.getValue();
  }

  getLoggedIn() {
    return this._loggedIn;
  }
  
  getUserName() {
    return this._storage.getUserName();
  }
  
  getUserId() {
    return this._storage.getUserId();
  }
  
  getPositionId() {
    return this._storage.getPositionId();
  }
  
  isLoggedUserAdmin() {
    return Number(this.getUserId()) === Number(adminId);
  }
  
  isLoggedUserPM() {
    return Number(this.getPositionId()) === Number(positionPmId);
  }
  
  getCurrentUserRole() {
    if (this.isLoggedUserAdmin()) {
      return 'admin';
    } else if (this.isLoggedUserPM()) {
      return 'pm';
    } else if (this.getLoggedIn()) {
      return 'employee';
    }
  }
  
}
