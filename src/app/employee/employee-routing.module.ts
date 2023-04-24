import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { EmployeeComponent } from './employee.component';
import { AttendanceComponent } from './main/attendance/attendance.component';
import { DashboardContentComponent } from './main/dashboard-content/dashboard-content.component';
import { PayrollComponent } from './main/payroll/payroll.component';
import { RecruitmentComponent } from './main/recruitment/recruitment.component';
import { ReportComponent } from './main/report/report.component';
const routes: Routes = [
    {path:'dashboard',component:DashboardContentComponent},

  {
    path: 'attendance',
    component: AttendanceComponent,
  },
  {
    path:'payroll',
    component:PayrollComponent
  },{
    path:'recruitment',
    component:RecruitmentComponent
  },{
    path:'report',
    component:ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
