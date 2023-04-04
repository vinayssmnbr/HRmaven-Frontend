import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrls: ['./employee-content.component.css']
})
export class EmployeeContentComponent implements OnInit {
  buttonbackgroundColor = '#2F2C9F';
  buttonColor='#FFFFFF';
  buttonbackgroundColor2='#ECECEC';
  buttonColor2='#2F2C9F';
  buttonbackgroundColor3 = '#2F2C9F';
  buttonColor3='#FFFFFF';
  employeeForm: FormGroup;
  constructor(){}

  ngOnInit() {
   this.employeeForm = new FormGroup({
      employeeId: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required)
    });
  }
  changeColor() {
    this.buttonbackgroundColor = this.buttonbackgroundColor === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.buttonColor = this.buttonColor === '#FFFFFF' ? '#2F2C9F' : '#FFFFFF';
  }
  changeColor2(){
    this.buttonbackgroundColor2 = this.buttonbackgroundColor2 === '#ECECEC' ? '#2F2C9F' : '#ECECEC';
    this.buttonColor2 = this.buttonColor2 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
  }
  changeColor3() {
    this.buttonbackgroundColor3 = this.buttonbackgroundColor3 === '#2F2C9F' ? '#FFFFFF' : '#2F2C9F';
    this.buttonColor3 = this.buttonColor3 === '#FFFFFF' ? '#2F2C9F' : '#FFFFFF';
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
currentForm = 1;

  nextForm() {
    const currentForm = document.getElementById(`form${this.currentForm}`);
    currentForm.classList.add('hidden');

    this.currentForm++;

    const nextForm = document.getElementById(`form${this.currentForm}`);
    nextForm.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('hidden');

    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.classList.add('hidden'));

    this.currentForm = 1;
  }
}
