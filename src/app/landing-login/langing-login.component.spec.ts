import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangingLoginComponent } from './langing-login.component';

describe('LangingLoginComponent', () => {
  let component: LangingLoginComponent;
  let fixture: ComponentFixture<LangingLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangingLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangingLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
