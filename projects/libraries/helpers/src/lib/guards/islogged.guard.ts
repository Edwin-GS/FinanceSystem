import { CanActivateFn, Router } from '@angular/router';

export const isloggedGuard: CanActivateFn = (route, state) => {
  let dashboard = 'finance-system/client/:user/:user_id';
  const router = new Router();

  const userString = localStorage.getItem('USER');

  if (
    !localStorage.getItem('LEGOFT_SID_SITE') &&
    !localStorage.getItem('USER')
  ) {
    return true;
  }

  if (userString) {
    const user = JSON.parse(userString);
    const username = user.user;
    const userId = user.id;
    const updatedDashboard = dashboard
      .replace(':user', userId)
      .replace(':user_id', username);
    // Redirigimos al usuario a su panel de control después de iniciar sesión
    router.navigate([updatedDashboard, { username, userId }]);
  }

  return false;
};
