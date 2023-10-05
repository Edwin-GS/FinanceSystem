import { NgModule } from '@angular/core';
import { HelpersComponent } from './helpers.component';
import {FieldDirective} from "./directives/field.directive";
import {UserDirective} from "./directives/user.directive";


@NgModule({
  declarations: [
    HelpersComponent,
    FieldDirective,
    UserDirective
  ],
  imports: [
  ],
  exports: [
    HelpersComponent
  ]
})
export class HelpersModule { }
