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
import { provideHotToastConfig } from '@ngneat/hot-toast';

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
    PropiedadesComponent,
    PropsTableComponent,
    LimitStringPipe,
  ],

  imports: [CommonModule, ReactiveFormsModule, USER_ROUTES],
  providers: [provideHotToastConfig({ position: 'top-center' })],
})
export class PagesModule {}
