import { Component } from '@angular/core';

@Component({
  selector: 'app-langing-login',
  templateUrl: './langing-login.component.html',
  styleUrls: ['./langing-login.component.css'],
})
export class LangingLoginComponent {
  isButtonDisabled: boolean = true;
  toggleButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}
