import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './users/user.component';
import { USER_ROUTES } from './pages.routes';
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { MarcaComponent } from './marca/marca.component';
import { MarcaTableComponent } from './components/marca-table/marca-table.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { CreateUpdateMarcaComponent } from './marca/create-update-marca/create-update-marca.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    MiAppsComponent,
    MarcaComponent,
    MarcaTableComponent,
    PageTitleComponent,
    CreateUpdateMarcaComponent,
  ],
  imports: [CommonModule, USER_ROUTES, ReactiveFormsModule],
})
export class PagesModule {}
