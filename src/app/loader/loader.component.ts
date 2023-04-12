import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  constructor(private router: Router){};

  ngOnInit(){
    setTimeout(()=>{
      this.router.navigate(['./login']);
    },4000)
  }

}
