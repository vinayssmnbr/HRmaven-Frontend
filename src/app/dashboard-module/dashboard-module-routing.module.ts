import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeavesContentComponent } from './main/leaves-content/leaves-content.component';

const routes: Routes = [{path:'', component:DashboardComponent},{path:'leaves',component:LeavesContentComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
