import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./users/user.component";
import { ProfessionComponent } from './profession/profession.component';
import { CreateProfessionComponent } from './profession/create/create-profession/create-profession.component';


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
  },
  {
    path: 'profession',
    component: ProfessionComponent,
    title: 'Profession'
  },
  {
    path: 'profession/create',
    component: CreateProfessionComponent,
    title: 'Crear Profesion'
  }
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);

