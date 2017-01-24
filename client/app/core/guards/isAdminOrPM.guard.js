import { Injectable } from '@angular/core';
import { UserService } from '../../auth';

@Injectable()
export class isAdminOrPMGuard {
  constructor(user: UserService) {
    this._user = user;
  }
  
  canActivate() {
    return this._user.isLoggedUserAdmin() || this._user.isLoggedUserPM();
  }
}
