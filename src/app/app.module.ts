import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgetComponent } from './forget/forget.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { ForgetempComponent } from './forgetemp/forgetemp.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { RecruitersfilterPipe } from './dashboar-module/pipe/recruitersfilter.pipe';
import { LangingLoginComponent } from './landing-login/langing-login.component';
// import { DashboardComponent } from './main/dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ForgetComponent,
    LoginComponent,
    TermConditionComponent,
    LoginEmployeeComponent,
    ForgetempComponent,
    LandingPageComponent,
    LangingLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,

  ],
  providers: [CookieService],
  bootstrap: [AppComponent],

})
export class AppModule {}
