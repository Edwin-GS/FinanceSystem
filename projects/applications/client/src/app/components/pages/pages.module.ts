import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { UserComponent } from './users/user.component';
import {USER_ROUTES} from "./pages.routes";
import { MiAppsComponent } from './mi-apps/mi-apps.component';



@NgModule({
  declarations: [
    UserComponent,
    MiAppsComponent
  ],
  imports: [
    CommonModule,
    USER_ROUTES
  ]
})
export class PagesModule {
}
