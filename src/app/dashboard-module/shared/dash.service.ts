import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  public headerContent: string;
  public activeComponent: string;

  constructor() { }
}
