import { Component } from '@angular/core';
import { DashService } from '../../shared/dash.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  constructor(public dashService: DashService) {
    dashService.activeComponent = 'calendar';
  }
  // progressBar: any;
  // progressText: any;
  // progress: number = 0;
  // interval: any;
  //  circularProgress: HTMLElement;
  // progressValue: HTMLElement;

  // progressStartValue: number = 0;
  // progressEndValue: number = 90;
  // speed: number = 100;
  ngOnInit() {
    // this.progressBar = document.querySelector('.progress_upload');
    // this.progressText = document.querySelector('.progress-text-input');

    // this.interval = setInterval(() => {
    //   this.progress++;
    //   if (this.progress > 100) {
    //     this.progress = 0;
    //   }
    //   this.progressBar.style.width = `${this.progress}%`;
    //   this.progressText.innerText = `${this.progress}%`;
    // }, 50);

  }
  // inputfilename: boolean = false;
  // selectedFile: File | null = null;
  // fileName: string = '';
  // onfileselected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   this.fileName = this.selectedFile ? this.selectedFile.name : '';
  // }
}
