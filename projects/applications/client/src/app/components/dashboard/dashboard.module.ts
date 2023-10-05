import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ClassicComponent } from './extras/classic/classic.component';
import { ModernComponent } from './extras/modern/modern.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DASHBOARD_ROUTES} from "./dashboard.routes";


@NgModule({
  declarations: [
    DashboardComponent,
    ClassicComponent,
    ModernComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DASHBOARD_ROUTES
  ], exports: [
    ModernComponent,
    ClassicComponent
  ]
})
export class DashboardModule { }
