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

  getUserProfile(): Observable<any> {
    const token = this.cookie.get('emp-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.profile, { headers }).pipe(
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
    return this.http.get(this.getempRecord, { headers });
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
  getEmployee() {
    return this.http.get(this.getData);
  }
}
