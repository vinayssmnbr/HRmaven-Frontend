import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'LandingModule', loadChildren: () => import('./landing-module/landing-module.module').then(m => m.LandingModuleModule) }, { path: 'dashboard', loadChildren: () => import('./dashboard-module/dashboard-module.module').then(m => m.DashboardModuleModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
