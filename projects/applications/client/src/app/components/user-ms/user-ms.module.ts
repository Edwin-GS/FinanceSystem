import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { UserComponent } from './users/user.component';
import {USER_ROUTES} from "./users-ms.routes";



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    USER_ROUTES
  ]
})
export class UserMsModule {
}
