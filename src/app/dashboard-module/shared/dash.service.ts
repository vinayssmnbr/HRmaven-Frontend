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

  constructor(private http: HttpClient) {}
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
}
