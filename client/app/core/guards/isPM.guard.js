import { Injectable } from '@angular/core';
import { UserService } from '../../auth';

@Injectable()
export class isPMGuard {
  constructor(user: UserService) {
    this._user = user;
  }
  
  canActivate() {
    return this._user.isLoggedUserPM();
  }
}
