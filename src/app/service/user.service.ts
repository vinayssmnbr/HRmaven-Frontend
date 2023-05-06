import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  map,
  catchError,
  throwError,
  of,
} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CookieService} from 'ngx-cookie-service'
// import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  setFormSubmitted(formSubmitted: boolean) {
    throw new Error('Method not implemented.');
  }

  isFromSignupPage = false;

  private behaviorNameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('default');

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

  private prefix = environment.v1;

  getData(email: string) {
    const url = `${this.prefix + 'getemails/email'}/${email}`;
    return this.http.get(url);
  }

  getUsernameData(username: any) {
    const url = `${this.prefix + 'getusername/username'}/${username}`;
    return this.http.get(url);
  }

  saveUser(data: any) {
    this.isLoggedIn.next(true);
    return this.http.post(this.prefix + 'signup', data);
  }

  updatepersonals(email: any, data: any) {
    const url = `${this.prefix + 'updatepersonal'}/${email}`;
    return this.http.patch(url, data);
  }
  addpersonals(email: any, data: any) {
    const url = `${this.prefix + 'putpersonal'}/${email}`;
    return this.http.put(url, data);
  }

  ForgotEmail(data: any) {
    return this.http.post(this.prefix + 'forgotpassword', data);
  }

  getpersonals(email: any){
    return this.http.get(`${this.prefix+"getpersonalsdata"}/${email}`);
  }

  newpwd(data: any, token: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': token,
      Accept: 'application/json',
    });
    return this.http.post(this.prefix + 'resetpassword', data, { headers });
  }

  newpwdaccount(email: any, data: any) {
    return this.http.post(
      `${this.prefix + 'resetpasswordaccount'}/${email}`,
      data
    );
  }

  //LOGIN AND VERIFY DASHBOARD

  // Role=localStorage.getItem('role')
  // users(data: any) {
  //     if (this.Role === 'HR') {
  //       return this.http.post(this.loginurl, data);
  //     } else {
  //       window.location.href = '/login';
  //       return null
  //     }

  // }
  users(data: any) {
    return this.http.post(this.prefix + 'login', data);
  }

  getUserProfileById(): Observable<any> {
    const token = this.cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.prefix + 'user-profile', { headers }).pipe(
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

    this.http.get(this.prefix + 'auth', { headers }).subscribe(
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

    this.http.get(this.prefix + 'auth', { headers }).subscribe(
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

  // checkOrganizationNameExists(orgName:string){
  //   return this.http.post('/checkOrganizationName',{organizationName:orgName})

  // }


  // getCompanyName(username:any){
  //   // return this.http.get('{this.usernames}/${username}');
  //   return this.http.get(`${this.prefix + 'username'}?type=${username}`)
  // }
  // getRegisteredEmail(email:any){
  //   // return this.http.get('{this.emails}/${email}');
  //   return this.http.get(`${this.prefix + 'email'}?type=${email}`)
  // }

  // getOldpassword(oldpassword: any) {
  //   const url = `${this.prefix + 'getOldpasssword/oldpassword'}/${oldpassword}`;
  //   return this.http.get(url);
  // }

}
