import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeContentComponent } from './main/employee-content/employee-content.component';
import { LeavesContentComponent } from './main/leaves-content/leaves-content.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [{path:'', component:DashboardComponent},
{path:'leaves',component:LeavesContentComponent},
{path:'employee',component:EmployeeContentComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
