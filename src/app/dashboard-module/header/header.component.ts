import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
showSearchBox = false;

  toggleSearchBox() {
    this.showSearchBox = !this.showSearchBox;
  }
}
