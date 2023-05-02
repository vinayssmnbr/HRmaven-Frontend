import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import * as filestack from 'filestack-js';
import { CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class DashService {
  // private baseUrl = 'https://hrmaven.works';
  // private baseUrl="http://localhost:3000"
  public headerContent: string;
  public activeComponent: string;
  private baseUrl=environment.baseUrl


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
    return this.http.get(this.profile, { headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  createData = environment.createData;
  getData = environment.getData;
  deleteData = environment.deleteData;
  getLeave = environment.getLeave;
  updateData = environment.updateData;
  getAttd = environment.getAttd;
  updatempdata = environment.updatempdata;
  getuid = environment.getuid;
  report = environment.report;
  profile = environment.profile;
  attendance=environment.attendance;
  attendancecard=environment.attendancecard;
  attendancegraph=environment.attendancegraph;
  leavegraph=environment.leavegraph;
  checkemail=environment.checkemail


  //ADD EMPLOYEE DATA
  // addEmployee(data) {
  //   return this.http.post(this.createData, data);

  // }

  //ADD  Employee Data
  addEmployee(data) {

    return this.http.post('https://hrmaven.works/api/create', data);
    // return this.http.post('http://localhost:3000/api/create', data);
    return this.http.post(this.createData, data);

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
    const url = `${this.deleteData}/${id}`;
    return this.http.delete<void>(url);
  }
  getLeaves() {
    return this.http.get(this.getLeave);
  }
  getleaves() {
    return this.http.get(this.updateData);
  }


  //  implementation of attendance backend by the harpreet singh
  // ///////////////////////////////////////////////////////////////
                                //Leave work by Harpreet
  // ///////////////////////////////////////////////////////////////


  getAttendance(date:any) {
    const headers= new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'MyDate': date
      }
    )
    return this.http.get(this.attendance,{ headers });
  }

  getAttendancecard(month:any){

    const headers= new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'month': month.toString()
      }
    )
    return this.http.get(this.attendancecard);
  }


  graphcontent()
  {
    const id = this.cookie.get('hr_id');
    const headers= new HttpHeaders(
      {
        'hrid':id.toString()
      }
    )
    return this.http.get(this.attendancegraph, { headers });
  }



  getleavecontent(){
    const id = this.cookie.get('hr_id');
    const headers= new HttpHeaders(
      {
        'hrid':id.toString()
      }
    )
    return this.http.get(environment.leavecontent ,{headers});
  }
  updateleavestatus(id:any,status:any,message:any){
    const headers= new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'status': status.toString(),
        'id':id.toString(),
        'message':message.toString()
      })
      return this.http.patch(environment.patchleave,{id,status,message},{ headers })
  }

  filterleave(data:any){
    const headers= new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'from':data.from,
        'to':data.to,
        'category':data.category
      }
    )
    return this.http.get('https://hrmaven.works/api/leave/filter/leave',{ headers});
  }
  /////////// end here from Harpreet Singh////////////////////////////





  getleavegraph(){
    const id = this.cookie.get('hr_id');
    const headers= new HttpHeaders(
      {
        'hrid':id.toString()
      }
    )
    return this.http.get(this.leavegraph, { headers });
  }

  getEmployeeStatus(status:string): Observable<any[]> {
    return this.http
      .get<any[]>(this.getData)
      .pipe(map((data) => data.filter((user) => user.status ===status)));
  }
  getEmployee(){
    const id = this.cookie.get('hr_id');
    const headers= new HttpHeaders(
      {
        'hrid':id.toString()
      }
    )
    return this.http.get(this.getData,{ headers })
  }

  getEmployeeEmail(email:any){
    return this.http.get(`${this.checkemail}/${email}`)
  }





  //UPDATE EMPLOYEE DATA
  updateEmployee(user: any) {
    console.log('employee update id ', user);
    return this.http.patch(`${this.updatempdata}/${user._id}`, user);

  }
  //UPDATE EMPLOYEE ATTENDENCE DATA
  updateEmpAttendance(data: any) {
    console.log('data', data);
    return this.http.patch(this.updateData + `/${data._id}`, data);
  }
  //SEARCH UID AND FILTER DESIGNATION
  searchuid(query: string, status: string) {
    console.log('des', status);
    return this.http
      .get<any>(`${this.getData}?uid=${query}&status=${status}`)
      // .pipe(map((data) => data.filter((user) => user.status === 'accepted')));
  }

  getLeaveData(type: string) {
    return this.http.get(`${this.getData}?type=${type}`);
  }

  getreport() {
    return this.http.get(this.report);
  }
  //GET EMPLOYEE CUSTOM UID
  getEmployeeUid() {
    return this.http.get(this.getuid);
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

  updateleave(uid:any,from:any,to:any) {

        const Array = this.getDates(from,to);
        const body = {  };
        body['Array'] = Array;
        body['uid'] = uid;

        return this.http.post('https://hrmaven.works/attendance/update/leave', body, {
            headers: { 'content-type': 'application/json' },
          })
  }


  private client: filestack.Client;
  fileUrl: any;

async upload(file:File, userId?:string){
  try{
    const res=await this.client.upload(file)
    this.fileUrl=res.url;
    const user=await this.updateEmployee({_id:userId,url:res.url}).subscribe((result)=>{
      console.log("update",result)
    })
  }catch(error){
    console.log(error)
  }

}

  upload1(file: File): Promise<any> {
    return this.client.upload(file)
  }

  exportUsers(data:any[]): Observable<Blob> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/csv'
    });
    return this.http.post(url,{data}, { headers, responseType: 'blob' });
  }

  updateEmpStatus(id,status):Observable<any>{
    const url = `${this.updatempdata}/${id}`;
    return this.http.patch(url,{status})
  }



}
