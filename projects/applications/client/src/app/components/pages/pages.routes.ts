import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./users/user.component";
import { ProfessionComponent } from './profession/profession.component';
// import { CreateProfessionComponent } from './profession/create/create-profession/create-profession.component';
// import { UpdateComponent } from './profession/update/update.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { ClassicComponent } from '../dashboard/extras/classic/classic.component';
import { MarcaComponent } from './marca/marca.component';
import { CreateUpdateMarcaComponent } from './marca/create-update-marca/create-update-marca.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { ClientComponent } from './client/client.component';

/**
 * Base route information
 *
 * users >> /finance-system/users/:user/:user_id
 *
 * **/

const UserRoutes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    title: 'Users'
  },
  { path: 'my-apps', component: MiAppsComponent, title: 'My-apps' },
  {
    path: '',
    component: ClassicComponent,
    children: [
      { path: 'brand', component: MarcaComponent, title: 'Brands' },
      { path: 'profession', component: ProfessionComponent, title: 'Profession' },
      { path: 'properties', component: PropiedadesComponent, title: 'Properties' },
      { path: 'clients', component: ClientComponent, title: 'Clients' }
    ],
  },
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);
