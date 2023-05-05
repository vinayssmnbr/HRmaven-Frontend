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
// import { LeavesContentComponent } from './leaves-content/leaves-content.component';
import { LeavesContentComponent } from './main/leaves-content/leaves-content.component';
import { EmployeeProfileComponent } from './main/employee-profile/employee-profile.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { TimesheetComponent } from './main/timesheet/timesheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodayattendancePipe } from './pipe/todayattendance.pipe';
import { FilterattendancePipe } from './pipe/filterattendance.pipe';
import { NgCircleProgressModule } from 'ng-circle-progress';
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
    EmployeeProfileComponent,
    CalendarComponent,
    TimesheetComponent,
    TodayattendancePipe,
    FilterattendancePipe,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      "outerStrokeGradient": false,
      "innerStrokeWidth": 10,
      "title": "UI",
      "animateTitle": false,
      "animationDuration": 1000,
      "showTitle": false,
      "showSubtitle": false,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": true})
  ],
})
export class EmployeeModule {}
