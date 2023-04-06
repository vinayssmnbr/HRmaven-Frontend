import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../service/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
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
    if (!this.userService.isLoggedIn.value) {
      this.userService.allDataLogin();
    }
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return this.userService.isLoggedIn;
  }
}
