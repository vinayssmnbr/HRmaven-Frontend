import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  showSearchBox=false;
  date: any;
  greeting: any;
  employee: string;
  loggedInName: any = '';
  userEmail: any = '';
  name: any = '';
  profileDisplay: boolean = false;
  getUsersProfile: any = [];
  showNotifications = true;
  profileDisplayNot: boolean;
  hideNotifications = false;
 readonly= false;

 constructor(private userService:UserService){}
  loginobjectid = localStorage.getItem('objectid')
  // loginobjectid:any = ''

 data: any = ''
 ngOnInit(){
  this.userService.getpersonals(this.loginobjectid).subscribe((res: any) => {

    console.log('response account:' +res.useridd);
  });
 }
  ReadMore: boolean = true;
  visible: boolean = false;
  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible; 
     if(!this.hideNotifications){
      this.profileDisplay= false
    }
  }
  id: any = 'all';
  tabChange(ids: any) {
    this.id = ids;
    console.log(this.id);
  }

  edit(){
   this.readonly=false;
  }
 
  showModal1=false;
  openModal1(){
    this.showModal1 = true;
  }
  
  closeModal1(){
    this.showModal1 = false;
  }

  showModal2=false;
  openModal2(){
    this.showModal2 = true;
  }
  
  closeModal2(){
    this.showModal2 = false;
  }


  showModal3=false;
  openModal3(){
    this.showModal3 = true;
  }
  
  closeModal3(){
    this.showModal3 = false;
  }

  
  
}
