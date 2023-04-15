import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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
    return this.http.get('https://hrmaven.works/user-profile', { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createData = 'https://hrmaven.works/api/create';
  getData = 'https://hrmaven.works/api/find';
  deleteData = 'https://hrmaven.works/api/';
  getLeave='https://hrmaven.works/api/leave//'
  updateData='https://hrmaven.works/attendance'
  getAttd='https://hrmaven.works/attendance';



  addEmployee(data) {
    return this.http.post(this.createData, data);
  }

  //ADD DATA

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
  //UPDATE DATA
  updateEmployee(data:any){
    return this.http.patch(`${this.updatempdata}/${data._id}`,data)
  }
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
     return this.http.get('https://hrmaven.works/attendance/report');
  }

  getEmployeeUid(){
    return this.http.get(this.getuid)

  }
}
