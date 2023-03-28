import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingModuleRoutingModule } from './landing-module-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    LandingModuleRoutingModule
  ]
})
export class LandingModuleModule { }
