import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./users/user.component";
import { ProfessionComponent } from './profession/profession.component';
import { CreateProfessionComponent } from './profession/create/create-profession/create-profession.component';
import { UpdateComponent } from './profession/update/update.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { ClassicComponent } from '../dashboard/extras/classic/classic.component';
import { MarcaComponent } from './marca/marca.component';

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
  },
  {
    path: 'profession/update/:id',
    component: UpdateComponent,
    title: 'Actualizar Profesion'
  },
  { path: 'my-apps', component: MiAppsComponent, title: 'My-apps' },
  {
    path: '',
    component: ClassicComponent,
    children: [{ path: 'brand', component: MarcaComponent, title: 'Brands' }],
  },
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);
