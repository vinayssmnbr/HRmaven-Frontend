import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showSearchBox=false;
  date: any;
  greeting: any;
  constructor() {}

  ngOnInit() {
    const today = new Date();
    this.date = today.toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const currentHour = today.getHours();
    if (currentHour < 12) {
      this.greeting = 'GOOD MORNING';
    } else if (currentHour < 17) {
      this.greeting = 'GOOD AFTERNOON';
    } else {
      this.greeting = 'GOOD EVENING';
    }
  }
  toggleSearchBox(){
    this.showSearchBox=!this.showSearchBox;
  }
}
