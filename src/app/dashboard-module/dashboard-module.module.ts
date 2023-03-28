import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardContentComponent } from './main/dashboard-content/dashboard-content.component';



@NgModule({
  declarations: [
   
  
    DashboardComponent,
           HeaderComponent,
           SidebarComponent,
           DashboardContentComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule
  ]
})
export class DashboardModuleModule { }
