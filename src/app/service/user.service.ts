import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
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

  saveurl = 'https://hrm21.onrender.com/signup';
  loginurl = 'https://hrm21.onrender.com/login';
  Forgoturl = 'https://hrm21.onrender.com/forgotpassword';
  Reseturl = 'https://hrm21.onrender.com/resetpassword';

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


  //  My code for profile fetch Name
  getUserProfileById(): Observable<any> {
    const token = this.cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `https://hrm21.onrender.com/user-profile`;

    return this.http.get(url, { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


    allDataLogin() {
      const token = this.cookie.get("token");

      if (!token) {
        this.router.navigate(['login']);
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get('https://hrm21.onrender.com/auth', { headers }).subscribe(
        (res: any) => {
          this.isLoggedIn.next(true);
          // this.router.navigate(['dashboard']);
        },
        (error) => {
          console.log(error);
          this.router.navigate(['login']);
        }
      );
    }


}
