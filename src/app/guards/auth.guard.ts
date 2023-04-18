import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { UserService } from '../service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private cookie: CookieService,
    private http: HttpClient
  ) {}
  private auth = environment.auth;
  isLoggedIn = new BehaviorSubject<boolean>(true);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //LOGIN AND VERIFY DASHBOARD
    if (this.userService.isLoggedIn.value) {
      // this.userService.mainAuth();
      const token = this.cookie.get('token');

      if (!token || token == '') {
        this.router.createUrlTree(['login']);
        return false;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.get(this.auth, { headers }).pipe(
        map((res: any) => {
          this.isLoggedIn.next(true);

          return true;
        }),
        catchError((error) => {
          return this.router.navigate(['login']);
        })
      );
    }
    if (!this.userService.isUserLoggedIn()) {
      this.router.createUrlTree(['login']);
      return false;
    }
    return false;
  }
}
