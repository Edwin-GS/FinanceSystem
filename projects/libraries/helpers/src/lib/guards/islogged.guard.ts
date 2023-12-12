import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const isloggedGuard = () => {
  let dashboard = '/finance-system/users/:user/:user_id';
  const router = inject(Router);
  const userString = inject(UserService).getLocalStorage();

  if (localStorage.getItem('LEGOFT_SID_SITE') && localStorage.getItem('USER')) {
    const username = userString?.userdata.name;
    const userId = userString?.userdata.id;

    const updatedDashboard = dashboard
      .replace(':user', username)
      .replace(':user_id', userId);
    // Redirigimos al usuario a su panel de control después de iniciar sesión
    router.navigate([updatedDashboard]);
    return false;
  }

  return true;
};
