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





  // getUserProfile(): Observable<any> {
  //   const token = this.cookie.get('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get('http://localhost:3000/user-profile', { headers }).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   );
  // }

  createData = 'http://localhost:3000/api/create';
  getData = 'http://localhost:3000/api/find';
  deleteData = 'http://localhost:3000/api/';


  addEmployee(data) {
    return this.http.post(this.createData, data);
  }
  deleteStudent(id: string): Observable<void> {
    const url = `${this.deleteData}/${id}`;
    return this.http.delete<void>(url);
  }
  getEmployee() {
    return this.http.get(this.getData);
  }
  getAttendance(){
    return this.http.get("http://localhost:3000/attendance");
  }
}

