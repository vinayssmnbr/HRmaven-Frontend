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

 
  //  My code for profile fetch Name
  getUserProfileById(): Observable<any> {
    const token = this.cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const url = `http://localhost:3000/user-profile`;
  
    return this.http.get(url, { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


    allDataLogin() {
      const token = this.cookie.get("token");
    
      if (!token) {
        // If token is missing, navigate to login page
        this.router.navigate(['login']);
        return;
      }
    
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
      this.http.get('http://localhost:3000/auth', { headers }).subscribe(
        (res: any) => {
          // Check if the user is already logged in
          if (!this.isLoggedIn.getValue()) {
            this.isLoggedIn.next(true);
            this.router.navigate(['dashboard']);
          }
        },
        (error) => {
          console.log(error);
          this.router.navigate(['login']);
        }
      );
    }
    

}
