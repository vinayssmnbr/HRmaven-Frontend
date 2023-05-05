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
  private prefix = environment.v1;


  getUserProfile(): Observable<any> {
    const id = this.cookie.get('id');
    const role = this.cookie.get('role');
    const token = this.cookie.get('emp-token');
    let headers = new HttpHeaders({
      'id': id.toString(),
      'authorization':`Bearer ${token}`,
      'role':role
    });
    return this.http.get(this.prefix+"user-profile", { headers });
  }


  getEmployeeRecord(): Observable<any> {
    const token = this.cookie.get('emp-token');
    const id = this.cookie.get('id');
    console.log(token);

    let headers = new HttpHeaders({
      'authorization':`Bearer ${token}`,
      'id': id.toString()
    });
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


  punchin(ip:any) {
    console.log('dvfoivemvvmrv');
    const id = this.cookie.get('id');

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id': id
      }
    )
    console.log(id);
    return this.http.post('http://localhost:3000/attendance/emp/punchin',{id,ip},{ headers });

  }

  punchout(ip:any) {
    console.log('dvfoivemvvmrv');
    const id = this.cookie.get('id');

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'id': id
      }
    )
    console.log(id);
    return this.http.post('http://localhost:3000/attendance/emp/punchout',{id,ip},{ headers });

  }

  getEmployee() {
    return this.http.get(this.prefix+'api/find');
  }

}
