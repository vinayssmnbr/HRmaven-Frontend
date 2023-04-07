import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashService {
  public headerContent: string;
  public activeComponent: string;

  constructor(private http: HttpClient, private router : Router) { }


  
}
