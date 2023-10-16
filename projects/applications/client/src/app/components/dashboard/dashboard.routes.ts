import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

/**
 * Base route information
 *
 * Dashboard Client App >> /finance-system/client/:user/:user_id
 *
 * **/

const DashboardRoutes: Routes = [
  {
    path: 'client/:user/:user_id',
    title: 'Finance System',
    component: DashboardComponent,
  },
  {
    path: 'users/:user/:user_id',
    loadChildren: () =>
      import('../pages/pages.module').then((m) => m.PagesModule),
  },
];

export const DASHBOARD_ROUTES = RouterModule.forChild(DashboardRoutes);
