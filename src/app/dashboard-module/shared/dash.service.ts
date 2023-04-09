import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  public headerContent: string;
  public activeComponent: string;

  createData = 'http://localhost:3000/api/create';
  getData = 'http://localhost:3000/api/find';
  deleteData = 'http://localhost:3000/api/';
  updateData='http://localhost:3000/api/update'

  constructor(private http: HttpClient) {}
  //ADD DATA
  addEmployee(data) {
    return this.http.post(this.createData, data);
  }
//DELETE DATA
  deleteStudent(id: string): Observable<void> {
    const url = `${this.deleteData}/${id}`;
    return this.http.delete<void>(url);
  }
//GET DATA
  getEmployee() {
    return this.http.get(this.getData);
  }
  //UPDATE DATA
  updateEmployee(id:string,updatedData:any){
    return this.http.put(`${this.updateData}/${id}`,updatedData)
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
}
