import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetComponent } from './forget/forget.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from './guards/auth.guard';
import { EmpGuard } from './guards/emp.guard';
import { AuthMainGuard } from './guards/authmain.guard';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
// import { AuthGuard } from './guards/auth.guard';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component'
import { ForgetempComponent } from './forgetemp/forgetemp.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LangingLoginComponent } from './landing-login/langing-login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'login-emp',component:LoginEmployeeComponent},
  {
    path: '',
    loadChildren: () =>
      import('./dashboard-module/dashboard-module.module').then(
        (m) => m.DashboardModuleModule
      ),
        canActivate:[AuthGuard]

  },
  { path: 'resetpassword/:token', component: ForgetComponent },
  { path: 'resetpasswordemp/:token', component: ForgetempComponent },
  {path:'t&c',component:TermConditionComponent},
  { path: '', loadChildren: () => import('./employee-module/employee.module').then(m => m.EmployeeModule),canActivate:[EmpGuard]},
  {path:'nofound', component:NoPageFoundComponent },
  // { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) }
  {path:'landing',component:LandingPageComponent},
  {path:'landing-login',component:LangingLoginComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


