import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
// import { EmployeeComponent } from './employee.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { DashboardContentComponent } from './main/dashboard-content/dashboard-content.component';
import { AttendanceComponent } from './main/attendance/attendance.component';
import { PayrollComponent } from './main/payroll/payroll.component';
// import { EmployeesComponent } from './main/employees/employees.component';
import { RecruitmentComponent } from './main/recruitment/recruitment.component';
import { ReportComponent } from './main/report/report.component';
import { LeavesContentComponent } from './leaves-content/leaves-content.component';
@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AttendanceComponent,
    PayrollComponent,
    // EmployeesComponent,
    RecruitmentComponent,
    ReportComponent,
    LeavesContentComponent,
    DashboardContentComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }