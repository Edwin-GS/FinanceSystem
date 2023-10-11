import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { isloggedGuard } from '../../guards/islogged.guard';

const AuthRoutes: Routes = [
  {
    path: 'login',
    title: 'Finance System',
    component: LoginComponent,
    canActivate: [isloggedGuard],
  },
  {
    path: 'signup',
    title: 'Finance System',
    component: SignupComponent,
    canActivate: [isloggedGuard],
  },
  {
    path: 'not-found',
    title: 'Finance System',
    component: NotFoundComponent,
  },
  {
    path: 'finance-system',
    loadChildren: () =>
      import(
        '../../../../../../applications/client/src/app/components/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'verify-email/:confirm',
    title: 'Legoft',
    component: VerifyEmailComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

export const AUTH_ROUTES = RouterModule.forChild(AuthRoutes);
