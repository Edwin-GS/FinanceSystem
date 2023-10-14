import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/user.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';

/**
 * Base route information
 *
 * users >> /finance-system/users/:user/:user_id
 *
 * **/

const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    title: 'Users',
  },
  { path: 'my-apps', component: MiAppsComponent, title: 'My-apps' },
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);
