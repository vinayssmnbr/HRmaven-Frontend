import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeContentComponent } from './main/employee-content/employee-content.component';
import { LeavesContentComponent } from './main/leaves-content/leaves-content.component';
import { DashboardContentComponent } from './main/dashboard-content/dashboard-content.component';
import { AttendanceContentComponent } from './main/attendance-content/attendance-content.component';
import { PayrollContentComponent } from './main/payroll-content/payroll-content.component';
import { RecruitmentContentComponent } from './main/recruitment-content/recruitment-content.component';
import { ReportContentComponent } from './main/report-content/report-content.component';
import { JobDetailsComponent } from './main/job-details/job-details.component';

// const routes: Routes = [{path:'', component:DashboardComponent},{path:'leaves',component:LeavesContentComponent},{path:'employee',component:EmployeeContentComponent}];
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardContentComponent,
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
      {
        path: 'payroll',
        component: PayrollContentComponent,
      },
      {
        path: 'recruitment',
        component: RecruitmentContentComponent,
      },
      {
        path: 'report',
        component: ReportContentComponent,
      },
      {
        path: 'job-details',
        component: JobDetailsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModuleRoutingModule {}
