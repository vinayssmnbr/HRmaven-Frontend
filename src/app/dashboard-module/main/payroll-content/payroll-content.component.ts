import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';

@Component({
  selector: 'app-payroll-content',
  templateUrl: './payroll-content.component.html',
  styleUrls: ['./payroll-content.component.css'],
})
export class PayrollContentComponent {
  constructor(private dashService: DashService) {
    dashService.activeComponent = 'payroll';
    dashService.headerContent = '';
  }
  
  ngOnInit() {
    // ------------Drop Down Menu----------
    // const optionMenu = document.querySelector<HTMLElement>('.filter-menu')!,
    //   selectBtn = optionMenu.querySelector<HTMLElement>('.select-btn')!,
    //   options = optionMenu.querySelectorAll<HTMLElement>('.option'),
    //   sBtn_text = optionMenu.querySelector<HTMLElement>('.sBtn-text')!;
    // selectBtn.addEventListener('click', () =>
    //   optionMenu.classList.toggle('active')
    // );
    // options.forEach((option) => {
    //   option.addEventListener('click', () => {
    //     let selectedOption =
    //       option.querySelector<HTMLElement>('.option-text')!.innerText;
    //     sBtn_text.innerText = selectedOption;
    //     optionMenu.classList.remove('active');
    //   });
    // });
    
    
   
  }
 
}
