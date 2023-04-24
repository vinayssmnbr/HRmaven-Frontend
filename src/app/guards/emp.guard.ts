import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { EmployeeService } from '../service/employee.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpGuard implements CanActivate {
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private cookie: CookieService,
    private http: HttpClient
  ) {}
  private auth = environment.auth;
  isLoggedIn = new BehaviorSubject<boolean>(true);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.employeeService.isLoggedIn.value) {
        // this.userService.mainAuth();
        const token = this.cookie.get('token');

        if (!token || token == '') {
          this.router.createUrlTree(['loginemp']);
          return false;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get(this.auth, { headers }).pipe(
          map((res: any) => {
            this.isLoggedIn.next(true);

            return true;
          }),
          catchError((error) => {
            return this.router.navigate(['loginemp']);
          })
        );
      }
      if (!this.employeeService.isUserLoggedIn()) {
        this.router.createUrlTree(['loginemp']);
        return false;
      }
      return false;
    }
  



}
