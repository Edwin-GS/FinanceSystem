import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const isloggedGuard: CanActivateFn = (route, state) => {
  let dashboard = 'finance-system/client/:user/:user_id';
  const router = new Router();

  const userString = new UserService(router).getLocalStorage();

  if (
    !localStorage.getItem('LEGOFT_SID_SITE') &&
    !localStorage.getItem('USER') &&
    !localStorage.getItem('USER')
  ) {
    return true;
  }

  if (userString) {
    const username = userString.userdata.name;
    const userId = userString.userdata.id;

    const updatedDashboard = dashboard
      .replace(':user', userId)
      .replace(':user_id', username);
    // Redirigimos al usuario a su panel de control después de iniciar sesión
    router.navigate([updatedDashboard, { username, userId }]);
  }

  return false;
};
