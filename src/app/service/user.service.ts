import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, map, catchError, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  isFromSignupPage = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  isLoggedIn = new BehaviorSubject<boolean>(true);

  isUserLoggedIn(): boolean {
    return this.cookie.get('token') !== '';
  }
  emailEntered: any = '';
  private saveurl = environment.saveurl;
  private loginurl = environment.loginurl;
  private Forgoturl = environment.Forgoturl;
  private Reseturl = environment.Reseturl;
  // private geteseturl = environment.getreseturl;
  // private getpwd = environment.getpwd;
  private url = environment.url;
  private auth = environment.auth;
  private  emailurl = environment.getemail
  // private changepwd = environment.changepassword

  getData(email: string) {
    const url = `${this.emailurl}/${email}`;
    return this.http.get(url);
  }

  // getpwdd(){
  //   return this.http.get(this.getpwd);
  // }

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
  // newpwd(data: any, token: any): Observable<any> {
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'auth-token': token,
  //     Accept: 'application/json',
  //   });
  
  //   if (data !== null) {
  //     return this.http.post(this.Reseturl, data, { headers }).pipe(
  //       catchError((error) => {
  //         console.log('Error:', error);
  //         return throwError(error);
  //       })
  //     );
  //   } else {
  //     // If data is null, return an empty observable
  //     return of(null);
  //   }
  // }
  




  // newpwdd(token: any){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'auth-token': token,
  //     Accept: 'application/json',
  //   });

  //   return this.http.get(this.geteseturl,{ headers });
  // }
  



  //LOGIN AND VERIFY DASHBOARD
  users(data: any) {
    return this.http.post(this.loginurl, data);
  }



  getUserProfileById(): Observable<any> {
    const token = this.cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.url, { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  allDataLogin() {
    const token = this.cookie.get('token');

    if (!token) {
      this.router.navigate(['login']);
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
        this.router.navigate(['login']);
      }
    );
  }
  mainAuth() {
    const token = this.cookie.get('token');

    if (!token) {
      this.router.navigate(['login']);
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
        this.router.navigate(['login']);
      }
    );
  }
}
