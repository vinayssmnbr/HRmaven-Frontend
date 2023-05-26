import { Component, ElementRef, Renderer2 } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})

export class LandingPageComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.setupScrollEvent();
    this.setupClickEvent();
  }
  setupScrollEvent() {
    this.renderer.listen(window, 'scroll', () => {
      if (window.pageYOffset < 50) {
        jQuery('#rocketmeluncur').slideUp(500);
      } else {
        jQuery('#rocketmeluncur').slideDown(500);
      }

      const ftrocketmeluncur = jQuery('#ft')[0]
        ? jQuery('#ft')[0]
        : jQuery(document.body)[0];
      const scrolltoprocketmeluncur =
        this.elementRef.nativeElement.querySelector('#rocketmeluncur');
      const viewPortHeightrocketmeluncur =
        window.innerHeight || document.documentElement.clientHeight;
      const scrollHeightrocketmeluncur =
        document.documentElement.scrollTop ||
        document.body.getBoundingClientRect().top;
      const basewrocketmeluncur = parseInt(ftrocketmeluncur.clientWidth);
      const swrocketmeluncur = scrolltoprocketmeluncur.clientWidth;

      if (basewrocketmeluncur < 1000) {
        let leftrocketmeluncur = parseInt(
          this.fetchOffset(ftrocketmeluncur)['left']
        );
        leftrocketmeluncur =
          leftrocketmeluncur < swrocketmeluncur
            ? leftrocketmeluncur * 2 - swrocketmeluncur
            : leftrocketmeluncur;
        scrolltoprocketmeluncur.style.left =
          basewrocketmeluncur + leftrocketmeluncur + 'px';
      } else {
        scrolltoprocketmeluncur.style.left = 'auto';
        scrolltoprocketmeluncur.style.right = '10px';
      }
    });
  }
  fetchOffset(el: any) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset
    };
  }
  setupClickEvent() {
    const rocketmeluncur = this.elementRef.nativeElement.querySelector('#rocketmeluncur');
    this.renderer.listen(rocketmeluncur, 'click', () => {
      jQuery("html, body").animate({ scrollTop: '0px', display: 'none' }, {
        duration: 600,
        easing: 'linear'
      });
  
      rocketmeluncur.classList.add('launchrocket');
      setTimeout(() => {
        rocketmeluncur.classList.remove('launchrocket');
      }, 800);
    });
  }
  contentdropdown: boolean = false;
  dropdownOpen() {
    this.contentdropdown = !this.contentdropdown;
  }
  colorvariable: number = 0;
  Changeselect(arr: any) {
    this.contentdropdown = false;
  }
  // scrolltop(){
  //   let audio =new Audio();
  //   audio.src = "../assets/Audio/videoplaybackmp4_iFjacumZ.mp3"
  //   audio.load();
  //   audio.play();
  // }
}
