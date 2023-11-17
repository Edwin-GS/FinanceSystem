import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/user.component';
import { ProfessionComponent } from './profession/profession.component';
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
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CreatePropertiesComponent } from './propiedades/create-properties/create-properties.component';
import { UpdatePropsComponent } from './propiedades/update-propiedades/update-propiedades.component';
import { ModelComponent } from './model/model.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { WarrantyVehicleComponent } from './warranty-vehicle/warranty-vehicle.component';
import { WarrantyVehicleDetailsComponent } from './warranty-vehicle/warranty-vehicle-details/warranty-vehicle-details.component';

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
      { path: 'garantes', component: GuarantorComponent, title: 'Garante' },
      {
        path: 'garantes/create',
        component: CreateGuarantorComponent,
        title: 'Crear garantes',
      },
      {
        path: 'garantes/:id',
        component: UpdateGuarantorViewComponent,
        title: 'Actualizar garante',
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
      {
        path: 'clients/details/:id',
        component: ClientDetailsComponent,
        title: 'Detalles del cliente',
      },
      { path: 'brand', component: BrandComponent, title: 'Marca' },
      {
        path: 'profession',
        component: ProfessionComponent,
        title: 'Profesion',
      },
      {
        path: 'properties/:id',
        component: PropiedadesComponent,
        title: 'Propiedades',
      },
      { path: 'brand', component: BrandComponent, title: 'Brands' },
      { path: 'model', component: ModelComponent, title: 'Models' },
      {
        path: 'vehicle-types',
        component: VehicleTypeComponent,
        title: 'Vehicle Types',
      },
      {
        path: 'warranty-vehicle/:clientId',
        component: WarrantyVehicleComponent,
        title: 'Vehicle under warranty',
      },

      {
        path: 'warranty-vehicle-details/:clientId/:vehicleId',
        component: WarrantyVehicleDetailsComponent,
        title: 'Vehicle under warranty',
      },

      {
        path: 'profession',
        component: ProfessionComponent,
        title: 'Profession',
      },
      {
        path: 'properties/:id/create',
        component: CreatePropertiesComponent,
        title: 'Propiedades',
      },
      {
        path: 'properties/:id/update/:propID',
        component: UpdatePropsComponent,
        title: 'Propiedades',
      },
      {
        path: 'solicitud-prestamos/:id',
        component: SolicitudPrestamosComponent,
        title: 'Solicitud de Prestamos',
      },
    ],
  },
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);
