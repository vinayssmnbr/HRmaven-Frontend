import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetComponent } from './forget/forget.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthMainGuard } from './guards/authmain.guard';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
// import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [ 
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },
  {path:'loginemp',component:LoginEmployeeComponent},
  {
    path: '',
    loadChildren: () =>
      import('./dashboard-module/dashboard-module.module').then(
        (m) => m.DashboardModuleModule
      ),canActivate: [AuthGuard],
  },
  { path: 'resetpassword/:token', component: ForgetComponent },
  {path:'t&c',component:TermConditionComponent},
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  // { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


