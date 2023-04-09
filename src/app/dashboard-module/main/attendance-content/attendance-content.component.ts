import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);
import { DashService } from '../../shared/dash.service';


@Component({
  selector: 'app-attendance-content',
  templateUrl: './attendance-content.component.html',
  styleUrls: ['./attendance-content.component.css']
})
export class AttendanceContentComponent implements OnInit{




  buttonbackgroundColor = '#2F2C9F';
  buttonColor='#FFFFFF';
  buttonbackgroundColor2='#ECECEC';
  buttonColor2='#2F2C9F';
  buttonbackgroundColor3 = '#2F2C9F';
  buttonColor3='#FFFFFF';
  employee: any[] = [];
  employeeid="";
  employeename="Name";

  // employeeForm: FormGroup;


  constructor( public dashService:DashService){
    // this.fetchdata();
     this.dashService.getEmployee().subscribe((res: any) => {
      console.log('data', res);
      this.employee = res;
    })

  }
  ngOnInit() {
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
    // Create a chart object
    const myChart = new Chart("lineChart", {
      type: 'line',
      data: {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24','25', '26', '27', '28', '29', '30'],
          datasets: [{
                  label: 'Present',
                  data: [50, 280, 370, 250, 80, 60, 50, 40, 70, 30, 20, 100,50, 280, 370, 250, 80, 60, 50, 40, 70, 30, 20, 100,250, 80, 60, 50, 40, 70],
                  backgroundColor: ['green'],
                  borderColor: ['green'],
                  borderWidth: 1,
                  pointStyle: 'circle'
              },
              {
                  label: 'Absent',
                  data: [230, 50, 150, 350, 320, 250, 70, 350, 100, 50, 300, 40,230, 50, 150, 350, 320, 250, 70, 350, 100, 50, 300, 40,50, 150, 350, 320, 250, 70],
                  backgroundColor: ['red'],
                  borderColor: ['red'],
                  borderWidth: 1,
                  pointStyle: 'circle'
              },
              {
                  label: 'Leaves',
                  data: [250, 300, 230, 340, 250, 50, 200, 300, 150, 200, 70, 40,250, 300, 230, 340, 250, 50, 200, 300, 150, 200, 70, 40,50, 200, 300, 150, 200, 70],
                  backgroundColor: ['yellow'],
                  borderColor: ['yellow'],
                  borderWidth: 1,
                  pointStyle: 'circle'
              }
          ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
            legend: {
                position: 'right',
                labels: {
                  padding: 40,
                  usePointStyle: true,
                  font: {
                    size: 14
                  }
                }
            }
        }
      }

    })
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
 //get data from employye content
  // fetchdata() {
  //   this.dashService.getEmployee().subscribe((res: any) => {
  //     console.log('data', res);
  //     this.employee = res;
  //   });
  // }
}
