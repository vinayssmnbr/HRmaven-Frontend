import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  loader: boolean = false;
  constructor(private userService: UserService) {
    
  }
  ngOnInit(): void {
    // this.userService.allDataLogin();
  }
}
