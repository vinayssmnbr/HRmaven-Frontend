import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { EmployeeService } from '../service/employee.service';
// import { UserService } from '../service/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthMainGuard implements CanActivate {
  constructor(
    private router: Router,
    // private userService: UserService,
    private employeeService:EmployeeService,
    private cookie: CookieService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //LOGIN AND VERIFY DASHBOARD
    if (this.employeeService.isLoggedIn.value) {
      this.employeeService.allDataLogin();
      // this.router.createUrlTree(['/employee/dashboard']);
    } else {
      this.router.createUrlTree(['login-emp']);
      return false;
    }
    return true;
  }
}
