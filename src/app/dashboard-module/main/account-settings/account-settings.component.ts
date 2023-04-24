import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
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
