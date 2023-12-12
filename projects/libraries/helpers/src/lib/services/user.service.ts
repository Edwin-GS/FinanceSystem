import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  sid: string | undefined;

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('LEGOFT_SID_SITE');
    localStorage.removeItem('USER');
    localStorage.removeItem('APP');

    this.router.navigate(['/login']).catch(() => {
      // Todo: add toast notifier
      console.log('Navigating to login page failed');
    });
  }

  getSID() {
    const sidTmp = localStorage.getItem('LEGOFT_SID_SITE');

    if (sidTmp && sidTmp !== 'undefined') {
      this.sid = sidTmp;
    } else {
      this.sid = '';
    }

    return this.sid;
  }

  getLocalStorage() {
    const userString = localStorage.getItem('USER');

    if (userString) {
      const userdata = JSON.parse(userString);
      const user = { userdata, app: localStorage.getItem('APP') };
      return user;
    }
    return;
  }
}
