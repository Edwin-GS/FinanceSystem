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
import { UpdatePropsComponent } from './propiedades/update-propiedades/update-propiedades.component';
import { LimitStringPipe } from './pipes/limit-string.pipe';
import { ClientComponent } from './client/client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { ClientCardComponent } from './components/client-card/client-table.component';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { UpdateClientViewComponent } from './client/update-client-view/update-client-view.component';
import { GuarantorComponent } from './guarantor/guarantor.component';
import { GuarantorCardComponent } from './components/guarantor-card/guarantor-table.component';
import { UpdateGuarantorViewComponent } from './guarantor/update-guarantor-view/update-guarantor-view.component';
import { CreateGuarantorComponent } from './guarantor/create-guarantor/create-guarantor.component';
import { SolicitudPrestamosComponent } from './solicitud-prestamos/solicitud-prestamos.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CreatePropertiesComponent } from './propiedades/create-properties/create-properties.component';

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
    
    PropiedadesComponent,
    UpdatePropsComponent,
    PropsTableComponent,

    LimitStringPipe,
    
    ClientComponent,
    ClientCardComponent,
    CreateClientComponent,
    UpdateClientViewComponent,

    GuarantorComponent,
    GuarantorCardComponent,
    CreateGuarantorComponent,
    UpdateGuarantorViewComponent,
    SolicitudPrestamosComponent,
    ClientDetailsComponent,
    CreatePropertiesComponent,

  ],

  imports: [CommonModule, ReactiveFormsModule, USER_ROUTES],
  providers: [provideHotToastConfig({ position: 'top-center' })],
})
export class PagesModule {}
