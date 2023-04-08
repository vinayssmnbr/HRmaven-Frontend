import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgetComponent } from './forget/forget.component';
import { CookieService } from 'ngx-cookie-service';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IgxLegendModule, IgxCategoryChartModule } from 'igniteui-angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ForgetComponent,
    LoaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    IgxLegendModule,
    IgxCategoryChartModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
