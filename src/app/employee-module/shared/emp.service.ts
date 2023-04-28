import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class EmpService {
  public headerContent: string;
  public activeComponent: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) { }



  getUserProfile(): Observable<any> {
    const token = this.cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.profile, { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  profile = environment.profile;

  getDates(startDate: string, stopDate: string): string[] {
    const dateArray: string[] = [];
    let currentDate = moment(startDate);
    const endDate = moment(stopDate);
    while (currentDate <= endDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }


  leavegraph(){
    const id = this.cookie.get('id');
    const headers= new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id':id
      }
    )
    return this.http.get('http://localhost:3000/api/leave/emp/leave',{ headers});

}

leavehistory() {
    const id = this.cookie.get('id');
    const headers= new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id':id
      }
    )
    return this.http.get('http://localhost:3000/api/leave/emp/history',{ headers});

}
}

