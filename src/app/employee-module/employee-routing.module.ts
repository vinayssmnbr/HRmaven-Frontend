import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { EmployeeComponent } from './employee.component';
import { AttendanceComponent } from './main/attendance/attendance.component';
import { DashboardContentComponent } from './main/dashboard-content/dashboard-content.component';
import { PayrollComponent } from './main/payroll/payroll.component';
import { RecruitmentComponent } from './main/recruitment/recruitment.component';
import { ReportComponent } from './main/report/report.component';
// import { LeavesContentComponent } from './leaves-content/leaves-content.component';
import { LeavesContentComponent } from './main/leaves-content/leaves-content.component';
import { EmployeeProfileComponent } from './main/employee-profile/employee-profile.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { NoPageFoundComponent } from './main/no-page-found/no-page-found.component';
const routes: Routes = [
    {path:'emp-dashboard',component:DashboardContentComponent},

  {
    path: 'emp-attendance',
    component: AttendanceComponent,
  },
  {
    path:'emp-payroll',
    component:PayrollComponent
  },{
    path:'emp-recruitment',
    component:RecruitmentComponent
  },{
    path:'emp-report',
    component:ReportComponent
  },
  {
    path:'emp-leave',component:LeavesContentComponent
  },{
    path:'emp-profile',component:EmployeeProfileComponent
  },
  {
    path:'emp-calendar',component:CalendarComponent
  },
  {
    path: 'no-page-found', component: NoPageFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
