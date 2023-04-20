import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root',
})
export class DashService {
  public headerContent: string;
  public activeComponent: string;
  constructor(private http: HttpClient, private router : Router,private cookie:CookieService) { }

  getUserProfile(): Observable<any> {
    const token = this.cookie.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.profile, { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  createData = environment.createData;
  getData =environment.getData;
  deleteData = environment.deleteData;
  getLeave=environment.getLeave
  updateData=environment.updateData
  getAttd=environment.getAttd
  updatempdata=environment.updatempdata
  getuid=environment.getuid
  report=environment.report
  profile=environment.profile


  //ADD EMPLOYEE DATA
  addEmployee(data) {
    return this.http.post(this.createData, data);
  }

//PASS DATA EMPLOYEE CONTENT TO EMPLOYEE PROFILE
  selectedEmployee:any
  setSelectedEmployee(user:any){
    this.selectedEmployee=user
  }
  getSelectedEmployee(){
    return this.selectedEmployee
  }


//DELETE DATA
  deleteStudent(id: string): Observable<void> {
    const url = `${this.deleteData}/${id}`;
    return this.http.delete<void>(url);
  }
  getLeaves() {
    return this.http.get(this.getLeave);
  }
  getleaves() {
    return this.http.get(this.updateData);
  }
  getAttendance(){
    return this.http.get(this.getAttd);
  }
  getEmployee() {
    return this.http.get(this.getData);
  }
  //UPDATE EMPLOYEE DATA
  updateEmployee(user:any){
    console.log('employee update id ', user);
    return this.http.patch(`${this.updatempdata}/${user._id}`,user)
  }
  //UPDATE EMPLOYEE ATTENDENCE DATA
  updateEmpAttendance(data: any) {
    console.log('data', data);
    return this.http.patch(this.updateData + `/${data._id}`, data);
  }
//SEARCH UID AND FILTER DESIGNATION
  searchuid(query: string, designation: string) {
    console.log('des', designation);
    return this.http.get<any>(
      `${this.getData}?uid=${query}&designation=${designation}`
    );
  }

  getLeaveData(type: string) {
    return this.http.get(`${this.getData}?type=${type}`);
  }


   getreport(){
     return this.http.get(this.report);
  }
//GET EMPLOYEE CUSTOM UID
  getEmployeeUid(){
    return this.http.get(this.getuid)

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

  updateleave(object: any, status: 'accept' | 'reject')
  {
    console.log(object);
    console.log(status);
    if (object.status == 'pending') {
      const url = `https://hrmaven.works/api/leave/${object._id}`;
      const body = { status: status };
      this.http
        .patch(url, JSON.stringify(body), {
          headers: { 'content-type': 'application/json' },
        })
        .subscribe(
          (response) => {
            console.log('Leave status updated successfully: ', response);
          },
          (error) => {
            console.error('Error updating leave status:', error);
          }
        );
      if (status == 'accept') {
        const Array = this.getDates(object.from, object.to);
        console.log(Array.length);
        const body = { status: status };
        body['Array'] = Array;
        body['empId'] = object.employeeId;
        body['name'] = object.employeeName;
        const url1 = environment.updateleave;
        this.http.post(url1, body, {
          headers: { 'content-type': 'application/json' },
        }).subscribe((res) => {
          console.log(res);
        })
      }
    }
    if (object.status == 'accept' && status == 'reject') {
      const Array = this.getDates(object.from, object.to);
      console.log(Array.length);
      const url = `https://hrmaven.works/api/leave/${object._id}`;
      const body = { status: status };
      this.http
        .patch(url, JSON.stringify(body), {
          headers: { 'content-type': 'application/json' },
        })
        .subscribe(
          (response) => {
            console.log('Leave status updated successfully: ', response);
          },
          (error) => {
            console.error('Error updating leave status:', error);
          }
        );
        body['Array'] = Array;
        body['empId'] = object.employeeId;
        body['name'] = object.employeeName;
        const url1 = environment.updateleave;
        this.http.post(url1, body, {
          headers: { 'content-type': 'application/json' },
        }).subscribe((res) => {
          console.log(res);
        })


    }
    if (object.status == 'reject' && status == 'accept') {
      const Array = this.getDates(object.from, object.to);
      console.log(Array.length);
      console.log('rejet -> accept ');
      const url = `https://hrmaven.works/api/leave/${object._id}`;
      const body = { status: status };
      this.http.patch(url, JSON.stringify(body), {
        headers: { 'content-type': 'application/json' },
      })
        .subscribe(
          (response) => {
            console.log('Leave status updated successfully: ', response);
          },
          (error) => {
            console.error('Error updating leave status:', error);
          }
        );
      body['Array'] = Array;
      body['empId'] = object.employeeId;
      body['name'] = object.employeeName;
      const url1 = environment.updateleave;
      this.http.post(url1, body, {
        headers: { 'content-type': 'application/json' },
      }).subscribe((res) => {
        console.log(res);
      })

    }
  }
}
