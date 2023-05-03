import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import * as filestack from 'filestack-js';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  public headerContent: string;
  public activeComponent: string;

  private prefix = environment.v1;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {
    this.client = filestack.init('AVzXOahQTzuCkUOe7NUeXz');
  }

  getUserProfile(): Observable<any> {
    const token = this.cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.prefix + 'user-profile', { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  //ADD EMPLOYEE DATA
  // addEmployee(data) {
  //   return this.http.post(this.createData, data);

  // }

  //ADD  Employee Data
  addEmployee(data) {
    return this.http.post(this.prefix + 'api/create', data);
  }

  //PASS DATA EMPLOYEE CONTENT TO EMPLOYEE PROFILE
  selectedEmployee: any;
  setSelectedEmployee(user: any) {
    this.selectedEmployee = user;
  }
  getSelectedEmployee() {
    return this.selectedEmployee;
  }

  //DELETE DATA
  deleteStudent(id: string): Observable<void> {
    const url = `${this.prefix + 'api/'}/${id}`;
    return this.http.delete<void>(url);
  }
  getLeaves() {
    return this.http.get(this.prefix + 'api/leave//');
  }
  getleaves() {
    return this.http.get(this.prefix + 'attendance');
  }

  //  implementation of attendance backend by the harpreet singh
  // ///////////////////////////////////////////////////////////////
  //Leave work by Harpreet
  // ///////////////////////////////////////////////////////////////

  getAttendance(date: any) {
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      MyDate: date,
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'attendance/date/attendance', {
      headers,
    });
  }

  getAttendancecard(month: any) {
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      month: month.toString(),
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'attendance/date/attendancecard', {
      headers,
    });
  }

  graphcontent() {
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'attendance/date/report', { headers });
  }

  getleavecontent() {
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'api/leave/data/leaves', { headers });
  }
  updateleavestatus(id: any, status: any, message: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      status: status.toString(),
      id: id.toString(),
      message: message.toString(),
    });
    return this.http.patch(
      this.prefix + 'api/leave/update/leave',
      { id, status, message },
      { headers }
    );
  }

  filterleave(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      from: data.from,
      to: data.to,
      category: data.category,
    });
    return this.http.get(this.prefix + 'api/leave/filter/leave', { headers });
  }
  /////////// end here from Harpreet Singh////////////////////////////

  getleavegraph() {
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'api/leave/graph/leave', { headers });
  }

  getEmployeeStatus(status: string): Observable<any[]> {
    return this.http
      .get<any[]>(this.prefix + 'api/find')
      .pipe(map((data) => data.filter((user) => user.status === status)));
  }
  getEmployee() {
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'api/find', { headers });
  }

  getEmployeeEmail(email: any) {
    return this.http.get('${this.checkemail}/${email}');
  }

  //UPDATE EMPLOYEE DATA
  updateEmployee(user: any) {
    console.log('employee update id ', user);
    return this.http.patch(`${this.prefix + 'api/update'}/${user._id}`, user);
  }
  //UPDATE EMPLOYEE ATTENDENCE DATA
  updateEmpAttendance(data: any) {
    console.log('data', data);
    return this.http.patch(this.prefix + 'attendance' + `/${data._id}`, data);
  }
  //SEARCH UID AND FILTER DESIGNATION
  searchuid(query: string, status: string) {
    console.log('des', status);
    return this.http.get<any>(
      `${this.prefix + 'api/find'}?uid=${query}&status=${status}`
    );
    // .pipe(map((data) => data.filter((user) => user.status === 'accepted')));
  }

  getLeaveData(type: string) {
    return this.http.get(`${this.prefix + 'api/find'}?type=${type}`);
  }

  getreport() {
    return this.http.get(this.prefix + 'attendance/report');
  }
  //GET EMPLOYEE CUSTOM UID
  getEmployeeUid() {
    return this.http.get(this.prefix + 'api/uid');
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

  updateleave(uid: any, from: any, to: any) {
    const Array = this.getDates(from, to);
    const body = {};
    body['Array'] = Array;
    body['uid'] = uid;

    return this.http.post(this.prefix + 'attendance/update/leave', body, {
      headers: { 'content-type': 'application/json' },
    });
  }

  private client: filestack.Client;
  fileUrl: any;

  async upload(file: File, userId?: string) {
    try {
      const res = await this.client.upload(file);
      this.fileUrl = res.url;
      const user = await this.updateEmployee({
        _id: userId,
        url: res.url,
      }).subscribe((result) => {
        console.log('update', result);
      });
    } catch (error) {
      console.log(error);
    }
  }

  upload1(file: File): Promise<any> {
    return this.client.upload(file);
  }

  exportUsers(data: any[]) {
    const url = `${this.prefix}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/csv',
    });
    return this.http.post(url, { data }, { headers, responseType: 'blob' });
  }

  updateEmpStatus(id, status): Observable<any> {
    const url = `${this.prefix + 'api/update'}/${id}`;
    return this.http.patch(url, { status });
  }

 


}
