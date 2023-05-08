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


  private prefix = environment.v1;
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
      if(this.cookie.get('role')!='hr')
      {
        this.router.navigate(['']);
      }

      if (!token || token == '') {
        // this.router.createUrlTree(['login']);
      this.router.navigate(['/login'])

        return false;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.get(this.prefix+"auth", { headers }).pipe(
        map((res: any) => {
          this.isLoggedIn.next(true);
          //if(localStorage.getItem('userRole') == 'HR'){
          //   return true;
          // }
          // return false;
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
