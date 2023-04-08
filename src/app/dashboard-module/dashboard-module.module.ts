import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardContentComponent } from './main/dashboard-content/dashboard-content.component';
import { EmployeeContentComponent } from './main/employee-content/employee-content.component';
import { LeavesContentComponent } from './main/leaves-content/leaves-content.component';
import { RouterModule } from '@angular/router';
import { AttendanceContentComponent } from './main/attendance-content/attendance-content.component';
import { PayrollContentComponent } from './main/payroll-content/payroll-content.component';
import { RecruitmentContentComponent } from './main/recruitment-content/recruitment-content.component';
import { ReportContentComponent } from './main/report-content/report-content.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
// import { IgxLegendModule, IgxCategoryChartModule } from 'igniteui-angular-charts';


@NgModule({
  declarations: [
    DashboardComponent,
           HeaderComponent,
           SidebarComponent,
           DashboardContentComponent,
           EmployeeContentComponent,
           LeavesContentComponent,
           AttendanceContentComponent,
           PayrollContentComponent,
           RecruitmentContentComponent,
           ReportContentComponent,
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // IgxLegendModule,
    // IgxCategoryChartModule,
    NgCircleProgressModule.forRoot({
      "animateTitle": false,
      "animationDuration": 1000,
      "showTitle": false,
      "showSubtitle": false,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": true}),
  ]
})
export class DashboardModuleModule {}
