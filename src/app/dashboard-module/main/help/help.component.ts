import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
content1:boolean=false;
content2:boolean= false;
content3:boolean= false;
content4:boolean = false;
content5:boolean = false;
opencontent1(){
  this.content1=!this.content1;
  this.content2=false;
  this.content3=false;
  this.content4=false;
  this.content5=false;
}
opencontent2(){
  this.content2=!this.content2;
  this.content1 = false;
  this.content3 = false;
  this.content4 = false;
  this.content5 = false;
}
opencontent3(){
  this.content3=!this.content3;
  this.content2 = false;
  this.content1 = false;
  this.content4 = false;
  this.content5 = false;
}
opencontent4(){
  this.content4=!this.content4;
  this.content2 = false;
  this.content3 = false;
  this.content1 = false;
  this.content5 = false;
}
opencontent5(){
  this.content5=!this.content5;
  this.content2 = false;
  this.content3 = false;
  this.content4 = false;
  this.content1 = false;
}
}
