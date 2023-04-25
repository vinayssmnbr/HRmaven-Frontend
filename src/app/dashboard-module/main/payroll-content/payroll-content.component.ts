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
    function makesvg(percentage, inner_text=""){

      var abs_percentage = Math.abs(percentage).toString();
      var percentage_str = percentage.toString();
      var classes = ""
    
      if(percentage < 0){
        classes = "danger-stroke circle-chart__circle--negative";
      } else if(percentage > 0 && percentage <= 30){
        classes = "warning-stroke";
      } else{
        classes = "success-stroke";
      }
    
     var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
         + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
         + '<circle class="circle-chart__circle '+classes+'"'
         + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9" />'
         + '<g class="circle-chart__info">'
         + '   <text class="circle-chart__percent" x="17.9" y="15.5">'+percentage_str+'%</text>';
    
      if(inner_text){
        svg += '<text class="circle-chart__subline" x="16.91549431" y="22">'+inner_text+'</text>'
      }
      
      svg += ' </g></svg>';
      
      return svg
    }
    
   
  }
 
}
