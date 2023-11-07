import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './users/user.component';
import { USER_ROUTES } from './pages.routes';
import { ProfessionComponent } from './profession/profession.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateComponentComponent } from './profession/create-update-component/create-update-component.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { BrandComponent } from './brand/brand.component';
import { CreateUpdateBrandComponent } from './brand/create-update-brand/create-update-brand.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { PropsTableComponent } from './components/prop-table/prop-table.component';
import { CreateUpdatePropsComponent } from './propiedades/create-update-propiedades/create-update-propiedades.component';
import { LimitStringPipe } from './pipes/limit-string.pipe';
import { ClientComponent } from './client/client.component';
import { CreateUpdateClientComponent } from './client/create-update-client/create-update-client.component';
import { ClientCardComponent } from './components/client-card/client-table.component';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { ModelComponent } from './model/model.component';
import { CreateUpdateModelComponent } from './model/create-update-model/create-update-model.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { CreateUpdateVehicleTypeComponent } from './vehicle-type/create-update-vehicle-type/create-update-vehicle-type.component';

@NgModule({
  declarations: [
    UserComponent,
    ProfessionComponent,
    CreateUpdateComponentComponent,
    MiAppsComponent,
    PageTitleComponent,
    ConfirmModalComponent,
    BrandComponent,
    CreateUpdateBrandComponent,
    CreateUpdatePropsComponent,
    CreateUpdateClientComponent,
    PropiedadesComponent,
    PropsTableComponent,
    LimitStringPipe,
    ClientComponent,
    ClientCardComponent,
    ModelComponent,
    CreateUpdateModelComponent,
    VehicleTypeComponent,
    CreateUpdateVehicleTypeComponent

  ],

  imports: [CommonModule, ReactiveFormsModule, USER_ROUTES],
  providers: [provideHotToastConfig({ position: 'top-center' })],
})
export class PagesModule {}
