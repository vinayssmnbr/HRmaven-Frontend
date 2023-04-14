import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  array: any = [
    {
      id: 0,
      name: 'Software Developer',
    },
    {
      id: 1,
      name: 'Frontend Developer',
    },
    {
      id: 3,
      name: 'Full Stack Developer',
    },
    {
      id: 4,
      name: 'UI/UX Designer',
    },
  ];
  contentdropdown: boolean = false;
  dropdownOpen() {
  
    this.contentdropdown = !this.contentdropdown;
  }
  Selectvariable: string = 'Designation';
  colorvariable: number =  0;
  Changeselect(arr: any) {
    this.Selectvariable = arr.name;
    this.colorvariable = arr.id;
    this.contentdropdown=false;
    console.log(arr.name);
  }
}
