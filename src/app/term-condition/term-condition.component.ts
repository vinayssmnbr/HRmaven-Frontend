import { Component } from '@angular/core';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css'],
})
export class TermConditionComponent {
  term1Visible = true;
  term2Visible = false;
  term3Visible = false;
  term4Visible = false;
  toggleterm1() {
    this.term1Visible = true;
    this.term2Visible = false;
    this.term3Visible = false;
    this.term4Visible = false;
  }
  toggleterm2() {
    this.term1Visible = false;
    this.term2Visible = true;
    this.term3Visible = false;
    this.term4Visible = false;
  }
  toggleterm3() {
    this.term1Visible = false;
    this.term2Visible = false;
    this.term3Visible = true;
    this.term4Visible = false;
  }
  toggleterm4() {
    this.term1Visible = false;
    this.term2Visible = false;
    this.term3Visible = false;
    this.term4Visible = true;
  }
}
