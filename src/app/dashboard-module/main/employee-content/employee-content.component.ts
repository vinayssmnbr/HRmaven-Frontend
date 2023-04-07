import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-employee-content',
  templateUrl: './employee-content.component.html',
  styleUrls: ['./employee-content.component.css'],
})
export class EmployeeContentComponent implements OnInit {
  employeeForm: FormGroup;


  employeeId: any = 211; 

  employeeData: any[] = [];

  employeeEmail: any ='';

  employeeID: any ='';

  constructor( public dashService:DashService){
    dashService.activeComponent = 'employees';
    dashService.headerContent = '';
  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
    });

    // ------------Drop Down Menu----------
    const optionMenu = document.querySelector<HTMLElement>('.select-menu')!,
      selectBtn = optionMenu.querySelector<HTMLElement>('.select-btn')!,
      options = optionMenu.querySelectorAll<HTMLElement>('.option'),
      sBtn_text = optionMenu.querySelector<HTMLElement>('.sBtn-text')!;
    selectBtn.addEventListener('click', () =>
      optionMenu.classList.toggle('active')
    );
    options.forEach((option) => {
      option.addEventListener('click', () => {
        let selectedOption =
          option.querySelector<HTMLElement>('.option-text')!.innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove('active');
      });
    });

    

  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
