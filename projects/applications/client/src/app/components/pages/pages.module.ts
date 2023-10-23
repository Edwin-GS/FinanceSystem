import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './users/user.component';
import {USER_ROUTES} from "./pages.routes";
import { ProfessionComponent } from './profession/profession.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateComponentComponent } from './profession/create-update-component/create-update-component.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { MarcaComponent } from './marca/marca.component';
import { MarcaTableComponent } from './components/marca-table/marca-table.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { CreateUpdateMarcaComponent } from './marca/create-update-marca/create-update-marca.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    USER_ROUTES
  ],
 
})
export class PagesModule {}
