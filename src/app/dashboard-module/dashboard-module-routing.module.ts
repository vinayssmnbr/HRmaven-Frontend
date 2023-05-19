import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeContentComponent } from './main/employee-content/employee-content.component';
import { LeavesContentComponent } from './main/leaves-content/leaves-content.component';
import { DashboardContentComponent } from './main/dashboard-content/dashboard-content.component';
import { AttendanceContentComponent } from './main/attendance-content/attendance-content.component';
// import { PayrollContentComponent } from './main/payroll-content/payroll-content.component';
import { RecruitmentContentComponent } from './main/recruitment-content/recruitment-content.component';
// import { ReportContentComponent } from './main/report-content/report-content.component';
import { JobDetailsComponent } from './main/job-details/job-details.component';
import { EmployeeProfileComponent } from './main/employee-profile/employee-profile.component';
import { AccountSettingsComponent } from './main/account-settings/account-settings.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { NoPageFoundComponent } from '../no-page-found/no-page-found.component';

// const routes: Routes = [{path:'', component:DashboardComponent},{path:'leaves',component:LeavesContentComponent},{path:'employee',component:EmployeeContentComponent}];
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContentComponent,
  },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },

  {
    path: 'employee',
    component: EmployeeContentComponent,
  },
  {
    path: 'leaves',
    component: LeavesContentComponent,
  },
  {
    path: 'attendance',
    component: AttendanceContentComponent,
  },
  // {
  //   path: 'payroll',
  //   component: PayrollContentComponent,
  // },
  {
    path: 'recruitment',
    component: RecruitmentContentComponent,
  },
  // {
  //   path: 'report',
  //   component: ReportContentComponent,
  // },
  {
    path: 'job-details',
    component: JobDetailsComponent,
  },
  { path: 'employee-profile', component: EmployeeProfileComponent },
  { path: 'setting', component: AccountSettingsComponent },
  { path: 'no-page-found', component: NoPageFoundComponent },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModuleRoutingModule {}
