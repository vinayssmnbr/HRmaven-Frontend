import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) { }

  isLoggedIn = new BehaviorSubject<boolean>(true);

  isUserLoggedIn(): boolean {
    return this.cookie.get('emp-token') !== '';
  }
  emailEntered: any = '';
  private saveurl = environment.saveurl;
  private loginurl = environment.loginurl;
  private Forgoturl = environment.Forgoturl;
  private Reseturl = environment.Reseturl;
  private url = environment.url;
  private auth = environment.auth;

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
  // Role=localStorage.getItem('role')
  // users(data: any) {
  //     if (this.Role === 'Employee') {
  //       return this.http.post(this.loginurl, data);
  //     } else {
  //       window.location.href = '/login';
  //       return null
  //     }

  // }


  users(data: any) {
      return this.http.post(this.loginurl, data);
    }





  // updateIsLinkClicked(email: string): Observable<any> {
  //   const url = `${this.changepwd}`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.cookie.get('token')}`
  //   });
  //   const body = { email: email };

  //   return this.http.post(url, body, { headers });
  // }


  //  My code for profile fetch Name
  getUserProfileById(): Observable<any> {
    const token = this.cookie.get('emp-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.url, { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  allDataLogin() {
    const token = this.cookie.get('emp-token');

    if (!token) {
      this.router.navigate(['login-emp']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(this.auth, { headers }).subscribe(
      (res: any) => {
        this.isLoggedIn.next(true);
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['login-emp']);
      }
    );
  }
  mainAuth() {
    const token = this.cookie.get('emp-token');

    if (!token) {
      this.router.navigate(['login-emp']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(this.auth, { headers }).subscribe(
      (res: any) => {
        this.isLoggedIn.next(true);
        // this.router.navigate(['dashboard']);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['login-emp']);
      }
    );
  }











}
