import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeContentComponent } from './main/employee-content/employee-content.component';

const routes: Routes = [{path:'', component:DashboardComponent},
 {path:'employee',component:EmployeeContentComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
