import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./users/user.component";


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
    title: 'Users'
  }
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);

