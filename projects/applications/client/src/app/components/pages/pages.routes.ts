import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/user.component';
import { ProfessionComponent } from './profession/profession.component';
// import { CreateProfessionComponent } from './profession/create/create-profession/create-profession.component';
// import { UpdateComponent } from './profession/update/update.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { ClassicComponent } from '../dashboard/extras/classic/classic.component';
import { BrandComponent } from './brand/brand.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { ClientComponent } from './client/client.component';
import { UpdateClientViewComponent } from './client/update-client-view/update-client-view.component';
import { GuarantorComponent } from './guarantor/guarantor.component';
import { CreateGuarantorComponent } from './guarantor/create-guarantor/create-guarantor.component';
import { UpdateGuarantorViewComponent } from './guarantor/update-guarantor-view/update-guarantor-view.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { SolicitudPrestamosComponent } from './solicitud-prestamos/solicitud-prestamos.component';

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
      { path: 'clients', component: ClientComponent, title: 'Clientes' },
      {
        path: 'clients/create',
        component: CreateClientComponent,
        title: 'Crear cliente',
      },
      {
        path: 'clients/:id',
        component: UpdateClientViewComponent,
        title: 'Actualizar cliente',
      },
      { path: 'garantes', component: GuarantorComponent, title: 'Garantes' },
      {
        path: 'garantes/create',
        component: CreateGuarantorComponent,
        title: 'Garantes',
      },
      {
        path: 'garantes/:id',
        component: UpdateGuarantorViewComponent,
        title: 'Garantes',
      },
      { path: 'brand', component: BrandComponent, title: 'Brands' },

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
      {
        path: 'solicitud-prestamos',
        component: SolicitudPrestamosComponent,
        title: 'Solicitud de Prestamos',
      },
    ],
  },
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);
