import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const isnotloggedGuard: CanActivateChildFn = () => {
  const router = inject(Router);

  if (
    !localStorage.getItem('LEGOFT_SID_SITE') &&
    !localStorage.getItem('USER') &&
    !localStorage.getItem('APP')
  ) {
    router.navigate(['login']);
    return false;
  }

  return true;
};
