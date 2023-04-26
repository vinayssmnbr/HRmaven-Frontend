import { Component } from '@angular/core';

@Component({
  selector: 'app-leaves-content',
  templateUrl: './leaves-content.component.html',
  styleUrls: ['./leaves-content.component.css']
})
export class LeavesContentComponent {

  ngOnIt(){
    const progressBar = document.querySelector(
      '.circular-progress'
    ) as HTMLElement;
    const valueContainer = document.querySelector(
      '.value-container'
    ) as HTMLElement;

    let progressValue = -1;
    const progressEndValue = 0;
    const speed = 50;

    const progress = setInterval(() => {
      progressValue++;
      valueContainer.textContent = `${progressValue}%`;

      progressBar.style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #D9D9D9 ${progressValue * 3.6}deg
      )`;

      if (progressValue === progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    const progressBar1 = document.querySelector(
      '.circular-progress1'
    ) as HTMLElement;
    const valueContainer1 = document.querySelector(
      '.value-container1'
    ) as HTMLElement;

    let progressValue1 = -1;
    const progressEndValue1 = 0;
    const speed1 = 50;

    const progress1 = setInterval(() => {
      progressValue1++;
      valueContainer1.textContent = `${progressValue1}%`;

      progressBar1.style.background = `conic-gradient(
        #7BD36D ${progressValue1 * 3.6}deg,
        #D9D9D9 ${progressValue1 * 3.6}deg
      )`;

      if (progressValue1 === progressEndValue1) {
        clearInterval(progress1);
      }
    }, speed1);

    const progressBar2 = document.querySelector(
      '.circular-progress2'
    ) as HTMLElement;
    const valueContainer2 = document.querySelector(
      '.value-container2'
    ) as HTMLElement;

    let progressValue2 = -1;
    const progressEndValue2 = 0;
    const speed2 = 50;

    const progress2 = setInterval(() => {
      progressValue2++;
      valueContainer2.textContent = `${progressValue2}%`;

      progressBar2.style.background = `conic-gradient(
        #F8BB6F ${progressValue2 * 3.6}deg,
        #D9D9D9 ${progressValue2 * 3.6}deg
      )`;

      if (progressValue2 === progressEndValue2) {
        clearInterval(progress2);
      }
    }, speed2);

    const progressBar3 = document.querySelector(
      '.circular-progress3'
    ) as HTMLElement;
    const valueContainer3 = document.querySelector(
      '.value-container3'
    ) as HTMLElement;

    let progressValue3 = -1;
    const progressEndValue3 = 0;
    const speed3 = 50;

    const progress3 = setInterval(() => {
      progressValue3++;
      valueContainer3.textContent = `${progressValue3}%`;

      progressBar3.style.background = `conic-gradient(
        #FA9796 ${progressValue3 * 3.6}deg,
        #D9D9D9 ${progressValue3 * 3.6}deg
      )`;

      if (progressValue3 === progressEndValue3) {
        clearInterval(progress3);
      }
    }, speed3);
  }

  array: any = [
    {
      id: 0,
      name: 'Casual leave',
    },
    {
      id: 1,
      name: 'Medical Leave',
    },
    {
      id: 3,
      name: 'Urgent Leave',
    },
    {
      id: 4,
      name: 'Earned Leave',
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
