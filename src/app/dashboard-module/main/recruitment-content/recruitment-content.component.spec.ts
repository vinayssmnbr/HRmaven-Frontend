import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentContentComponent } from './recruitment-content.component';

describe('RecruitmentContentComponent', () => {
  let component: RecruitmentContentComponent;
  let fixture: ComponentFixture<RecruitmentContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
