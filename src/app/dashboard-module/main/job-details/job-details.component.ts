import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  buttonColor2 = '#2F2C9F';
  buttonbackgroundColor2 = '#ECECEC';
  buttonColor3 = '#FFFFFF';
  buttonbackgroundColor3 = '#2F2C9F';
  constructor(private dashService:DashService){
    dashService.activeComponent = 'job-details';
    dashService.headerContent = '';
  }
  firstStep: boolean = true;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  showModal = false;
  openModal() {
    this.showModal = true;
    this.firstStep = true;
    this.secondStep = false;
    this.thirdStep = false;
    // this.showModalContent = true;
  }
  changeColor2() {
    this.buttonbackgroundColor2 =
      this.buttonbackgroundColor2 === '#ECECEC' ? '#2F2C9F' : '#ECECEC';
    this.buttonColor2 = this.buttonColor2 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
  }
  changeColor3() {
    this.buttonbackgroundColor3 =
      this.buttonbackgroundColor3 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.buttonColor3 = this.buttonColor3 === '#FFFFFF' ? '#2F2C9F' : '#FFFFFF';
  }


 
  visible:boolean =false
  onclick(){

  this.visible = !this.visible;
  }






  
}