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
    return this.http.get('https://hrm21.onrender.com/user-profile', { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createData = 'https://hrm21.onrender.com/api/create';
  getData = 'https://hrm21.onrender.com/api/find';
  deleteData = 'https://hrm21.onrender.com/api/';
  getLeave='https://hrm21.onrender.com/api/leave//'
  updateData='https://hrm21.onrender.com/attendance'
  getAttd='https://hrm21.onrender.com/attendance';



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
  updateEmployee1(id:string,updatedData:any){
    return this.http.put(`${this.updateData}/${id}`,updatedData)
  }
  updateEmployee(data: any) {
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
     return this.http.get('http://localhost:3000/attendance/report');
  }
}
