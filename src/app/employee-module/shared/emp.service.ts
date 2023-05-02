import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, forkJoin } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import * as filestack from 'filestack-js';
@Injectable({
  providedIn: 'root',
})
export class EmpService {
  token(token: any) {
    throw new Error('Method not implemented.');
  }
  public headerContent: string;
  public activeComponent: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {
    this.client = filestack.init('AVzXOahQTzuCkUOe7NUeXz');
  }
  getData = environment.getData;
  getempRecord = environment.getempRecord;

  private prefix = environment.v1;


  getUserProfile(): Observable<any> {
    const token = this.cookie.get('emp-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.prefix+"user-profile", { headers }).pipe(
      map((response: any) => {
        console.log('yyy', response);
        return response;
      })
    );
  }

  getEmployeeRecord(): Observable<any> {
    const token = this.cookie.get('emp-token');
    console.log(token);
    // const email = localStorage.getItem('email');
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(this.prefix+"api/detail/fetch", { headers });
  }


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


  leavegraph() {
    const id = this.cookie.get('id');
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id': id
      }
    )
    return this.http.get(this.prefix+"api/leave/emp/leave", { headers });

  }

  leavehistory() {
    const id = this.cookie.get('id');
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id': id
      }
    )
    return this.http.get(this.prefix+'api/leave/emp/history', { headers });


  }

  attendanceload() {
    const id = this.cookie.get('id');
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id': id
      }
    )
    return this.http.get(this.prefix+'attendance/emp/attendance', { headers });
  }


  private client: filestack.Client;

  fileUrl: any;

  async upload(file: File): Promise<void> {
    try {
      const res = await this.client.upload(file);
      this.fileUrl = res.url;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  createleave(data: any) {
    const id = this.cookie.get('id');
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'data': data
      }
    )
    data['id']=id;
    const d = new Date();
    data['appliedon']=d;
    return this.http.post(this.prefix+'api/leave/add/leave', data);
  }

  attendanceTime() {
    const id = this.cookie.get('id');
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id': id
      }
    )
    return this.http.get(this.prefix+'attendance/check/empattendance', { headers });
  }


  punch(action:any) {
    const id = this.cookie.get('id');
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id': id,
        'in':action
      }
    )
    return this.http.patch(this.prefix+'attendance/update/time', { headers });

  }

  getEmployee() {
    return this.http.get(this.prefix+'api/find');
  }

}
