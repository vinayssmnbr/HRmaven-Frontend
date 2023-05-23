import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import * as filestack from 'filestack-js';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  public headerContent: string;
  public activeComponent: string;
  welcome: boolean = true;
  private prefix = environment.v1;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private userService: UserService
  ) {
    // this.client = filestack.init('Aj12noD8xTvmflkSZZHZGz');
    this.client = filestack.init('AKNI8H7i1QuCSlSce9dlFz');
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
  addEmployee(data: any) {
    const id = this.cookie.get('hr_id');
    data['hrid'] = id;
    return this.http.post(this.prefix + 'api/create', data);
  }

  addJobVacancies(data: any) {
    const id = this.cookie.get('hr_id');
    data['hrid'] = id;
    return this.http.post(this.prefix + 'job/vacancies', data);
  }

  fetchJobVecancies() {
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'job/recdata', { headers });
  }

  fetchrecruiterEmail() {
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'job/jobemail', { headers });
  }

  addCandidate(data: any) {
    const id = this.cookie.get('hr_id');
    data['hrid'] = id;
    return this.http.post(this.prefix + 'candid/candidates', data);
  }

  // addEmployee(data) {
  //   return this.http.post('http://localhost:3000/api/create', data);

  // }
  showModal = true;
  setFormSubmitted(isFormSubmitted: boolean) {
    if (isFormSubmitted) {
      this.showModal = false;
    }
  }

  //PASS DATA EMPLOYEE CONTENT TO EMPLOYEE PROFILE
  private selecteEmployeeKey = 'selectedEmployee';
  private selectedJobDetailKey = 'selectedJobDetail';

  setSelectedEmployee(user: any) {
    localStorage.setItem(this.selecteEmployeeKey, JSON.stringify(user));
  }
  getSelectedEmployee() {
    const itemString = localStorage.getItem(this.selecteEmployeeKey);
    return itemString ? JSON.parse(itemString) : null;
  }

  setSelectedJobDetail(item: any) {
    localStorage.setItem(this.selectedJobDetailKey, JSON.stringify(item));
  }

  getSelectedJobDetail() {
    const itemString = localStorage.getItem(this.selectedJobDetailKey);
    return itemString ? JSON.parse(itemString) : null;
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
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      from: data.from,
      to: data.to,
      category: data.category,
      hrid: id.toString(),
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
    return this.http.get(`${this.prefix + 'api/checkemail'}/${email}`);
  }

  getEmployeeMobile(mobile: any) {
    return this.http.get(`${this.prefix + 'api/checkmobile'}/${mobile}`);
  }

  getCandidateEmail(email: any) {
    return this.http.get(`${this.prefix + 'api/checkedemail'}/${email}`);
  }

  getCandidateMobile(mobile: any) {
    return this.http.get(`${this.prefix + 'api/checkedmobile'}/${mobile}`);
  }

  getCandidate() {
    const id = this.cookie.get('job_id');
    const headers = new HttpHeaders({
      jobid: id.toString(),
    });
    return this.http.get(this.prefix + 'candid/findcandidate', { headers });
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
    const id = this.cookie.get('hr_id');
    const headers = new HttpHeaders({
      hrid: id.toString(),
    });
    return this.http.get(this.prefix + 'api/uid', { headers });
  }

  getemprecord(id: any) {
    const headers = new HttpHeaders({
      id: id.toString(),
    });
    return this.http.get(this.prefix + 'attendance/emp/attendance', {
      headers,
    });
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

  updateleave(empId: any, from: any, to: any) {
    const Array = this.getDates(from, to);
    const body = {};
    body['Array'] = Array;
    body['empId'] = empId;

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

  uploaded(file: File): Promise<any> {
    return this.client.upload(file);
  }

  exportUsers(data: any[]) {
    const url = `${this.prefix}user/export`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/csv',
    });
    return this.http.post(url, { data }, { headers, responseType: 'blob' });
  }

  updateEmpStatus(id: any, status: any): Observable<any> {
    const url = `${this.prefix + 'api/update'}/${id}`;
    return this.http.patch(url, { status });
  }

  updateJobStatus(id: any, status: any) {
    const url = `${this.prefix + 'candid/status/jobupdate'}/${id}`;
    return this.http.patch(url, { status });
  }
}
