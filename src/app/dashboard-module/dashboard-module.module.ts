import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardContentComponent } from './main/dashboard-content/dashboard-content.component';
import { LeavesContentComponent } from './main/leaves-content/leaves-content.component';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardContentComponent,
    LeavesContentComponent,
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    RouterModule,
    NgCircleProgressModule.forRoot({
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
export class DashboardModuleModule {}
