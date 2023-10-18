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
import { MarcaComponent } from './marca/marca.component';



@NgModule({
  declarations: [
    UserComponent,
<<<<<<< HEAD
    ProfessionComponent,
    CreateProfessionComponent,
    UpdateComponent,
    CreateUpdateComponentComponent,
    MiAppsComponent
=======
    MiAppsComponent,
    MarcaComponent
>>>>>>> adf40c9829addf8e33d0c3f88c755b9cba79f496
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    USER_ROUTES
  ]
})
export class PagesModule {
}
