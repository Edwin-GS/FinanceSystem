import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './users/user.component';
import { USER_ROUTES } from './pages.routes';
import { ProfessionComponent } from './profession/profession.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateComponentComponent } from './profession/create-update-component/create-update-component.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { MarcaComponent } from './marca/marca.component';
import { MarcaTableComponent } from './components/marca-table/marca-table.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { CreateUpdateMarcaComponent } from './marca/create-update-marca/create-update-marca.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { PropsTableComponent } from './components/prop-table/prop-table.component';
import { CreateUpdatePropsComponent } from './propiedades/create-update-propiedades/create-update-propiedades.component';
import { LimitStringPipe } from './pipes/limit-string.pipe';
import { ClientComponent } from './client/client.component';
import { CreateUpdateClientComponent } from './client/create-update-client/create-update-client.component';
import { ClientCardComponent } from './components/client-card/client-table.component';

@NgModule({
  declarations: [
    UserComponent,
    ProfessionComponent,
    CreateUpdateComponentComponent,
    MiAppsComponent,
    MarcaComponent,
    MarcaTableComponent,
    PageTitleComponent,
    CreateUpdateMarcaComponent,
    CreateUpdatePropsComponent,
    CreateUpdateClientComponent,
    PropiedadesComponent,
    PropsTableComponent,
    LimitStringPipe,
    ClientComponent,
    ClientCardComponent
  ],

  imports: [CommonModule, ReactiveFormsModule, USER_ROUTES],
})
export class PagesModule {}
