import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { UserComponent } from './users/user.component';
import {USER_ROUTES} from "./pages.routes";
import { ProfessionComponent } from './profession/profession.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProfessionComponent } from '../pages/profession/create/create-profession/create-profession.component';
import { UpdateComponent } from './profession/update/update.component';
import { CreateUpdateComponentComponent } from './profession/create-update-component/create-update-component.component';
import { MiAppsComponent } from './mi-apps/mi-apps.component';



@NgModule({
  declarations: [
    UserComponent,
    ProfessionComponent,
    CreateProfessionComponent,
    UpdateComponent,
    CreateUpdateComponentComponent,
    MiAppsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    USER_ROUTES
  ]
})
export class PagesModule {
}
