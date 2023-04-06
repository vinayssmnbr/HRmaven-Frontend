import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  isLoggedIn = new BehaviorSubject<boolean>(true);

  isUserLoggedIn(): boolean {
    return this.cookie.get('token') !== '';
  }

  saveurl = 'http://localhost:3000/signup';
  loginurl = 'http://localhost:3000/login';
  Forgoturl = 'http://localhost:3000/forgotpassword';
  Reseturl = 'http://localhost:3000/resetpassword';

  saveUser(data: any) {
    this.isLoggedIn.next(true);
    return this.http.post(this.saveurl, data);
  }

  ForgotEmail(data: any) {
    return this.http.post(this.Forgoturl, data);
  }

  newpwd(data: any, token: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': token,
      Accept: 'application/json',
    });

    return this.http.post(this.Reseturl, data, { headers });
  }

  //LOGIN AND VERIFY DASHBOARD
  users(data: any) {
    return this.http.post(this.loginurl, data);
  }

  allDataLogin() {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${this.cookie.get('token')}`
    );
    console.log(headers);

    this.http.get('http://localhost:3000/auth', { headers }).subscribe(
      (res: any) => {
        this.isLoggedIn.next(true);
        this.router.navigate(['dashboard']);
      },

      (error) => {
        console.log(error);
        this.router.navigate(['login']);
      }
    );
  }
}
