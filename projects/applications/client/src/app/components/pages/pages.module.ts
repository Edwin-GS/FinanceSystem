import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { UserComponent } from './users/user.component';
import {USER_ROUTES} from "./pages.routes";
import { MiAppsComponent } from './mi-apps/mi-apps.component';
import { MarcaComponent } from './marca/marca.component';



@NgModule({
  declarations: [
    UserComponent,
    MiAppsComponent,
    MarcaComponent
  ],
  imports: [
    CommonModule,
    USER_ROUTES
  ]
})
export class PagesModule {
}
