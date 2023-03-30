import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  date: any;
greeting:any
  constructor() {
  }

  ngOnInit() {
    const today = new Date();
    this.date = today.toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const currentHour = today.getHours();
    if (currentHour < 12) {
      this.greeting = "Good Morning";
    } else if (currentHour < 18) {
      this.greeting = "Good AFternoon";
    } else {
      this.greeting = "Good Evening";
    }


}

}
