import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, map, catchError, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CookieService} from 'ngx-cookie-service'
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isFromSignupPage = false;

  private behaviorNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('default');

  // Method to update the behavior name
  updateBehaviorName(name: string) {
    this.behaviorNameSubject.next(name);
  }

  // Method to get the current behavior name as an Observable
  getBehaviorName(): Observable<string> {
    return this.behaviorNameSubject.asObservable();
  }
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
  private resetpwdaccount = environment.resetpwdaccount
  private url = environment.url;
  private auth = environment.auth;
  private  emailurl = environment.getemail
  private personaldataupdate = environment.updatepersonaldata
  private addpersonaldata = environment.addpersonalurl
  private getpersonaldata = environment.getpersonaldata


  getData(email: string) {
    const url = `${this.emailurl}/${email}`;
    return this.http.get(url);
  }

  saveUser(data: any) {
    this.isLoggedIn.next(true);
    return this.http.post(this.saveurl, data);
  }
 
  updatepersonals(email: any, data: any){
    const url = `${this.personaldataupdate}/${email}`;
    return this.http.patch(url, data);
  }
  addpersonals(email: any, data: any){
    const url = `${this.addpersonaldata}/${email}`;
    return this.http.put(url, data);
  }

  ForgotEmail(data: any) {
    return this.http.post(this.Forgoturl, data);
  }

  getpersonals(email: any){
    return this.http.get(`${this.getpersonaldata}/${email}`);
  }

  newpwd(data: any, token: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': token,
      Accept: 'application/json',
    });
    return this.http.post(this.Reseturl, data, { headers });
  }

  // resetPassword(token: string, newpassword: any, confirm: any): Observable<any> {
  //   // resetPassword(token: string, data: any): Observable<any> {
  //   const url = `${this.Reseturl}`;
  //   const body = {
  //     token: token,
  //     // datapwd: data
  //     password: newpassword,
  //     confirmpassword: confirm
  //   };
    
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'auth-token': token,
  //     Accept: 'application/json'
  //   });

  //   return this.http.post<any>(url, body, { headers }).pipe(
  //     catchError((error: any) => {
  //       return throwError(error.error.message || 'Server error');
  //     })
  //   );
  // }


  // resetPasswordUrl = 'http://localhost:3000/reset'
  // resetPassword(token: string): Observable<any> {
  //   return this.http.post(this.resetPasswordUrl, { token });
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
