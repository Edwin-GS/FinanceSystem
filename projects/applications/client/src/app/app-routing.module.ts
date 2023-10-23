import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        '../../../../libraries/helpers/src/lib/components/auth/auth.module'
      ).then((m) => m.AuthModule),
  },
];

// imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
