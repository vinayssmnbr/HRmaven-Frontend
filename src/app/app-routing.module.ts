import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetComponent } from './forget/forget.component';

const routes: Routes = [{path:'',component:AppComponent},{path:'login',component:LoginComponent},{path:'signup',component:SignupComponent},{ path: 'dashboard', loadChildren: () => import('./dashboard-module/dashboard-module.module').then(m => m.DashboardModuleModule) },{path:'reset/:token',component:ForgetComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
