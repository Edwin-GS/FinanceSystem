import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/user.component';
import { ProfessionComponent } from './profession/profession.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { ClassicComponent } from '../dashboard/extras/classic/classic.component';
import { BrandComponent } from './brand/brand.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { ClientComponent } from './client/client.component';
import { ModelComponent } from './model/model.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';

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
    title: 'Users',
  },
  { path: 'my-apps', component: MiAppsComponent, title: 'My-apps' },
  {
    path: '',
    component: ClassicComponent,
    children: [
      {
        path: 'profession',
        component: ProfessionComponent,
        title: 'Profession',
      },
      {
        path: 'properties',
        component: PropiedadesComponent,
        title: 'Properties',
      },
      { path: 'clients', component: ClientComponent, title: 'Clients' },
      { path: 'brand', component: BrandComponent, title: 'Brands' },
      { path: 'model', component: ModelComponent, title: 'Models' },
      {
        path: 'vehicle-types',
        component: VehicleTypeComponent,
        title: 'Vehicle Types',
      },

      {
        path: 'profession',
        component: ProfessionComponent,
        title: 'Profession',
      },
      {
        path: 'properties',
        component: PropiedadesComponent,
        title: 'Properties',
      },
    ],
  },
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);
