import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingInComponent } from './components/sing-in/sing-in.component';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../../libraries/helpers/src/lib/components/auth/auth.module'
      ).then((m) => m.AuthModule),
  },
  {path: 'login', component: SingInComponent},
];

// imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
