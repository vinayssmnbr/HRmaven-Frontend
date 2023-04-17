import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';



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


  addEmployee(data) {
    return this.http.post(this.createData, data);
  }

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
}
