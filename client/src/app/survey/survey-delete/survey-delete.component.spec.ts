import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDeleteComponent } from './survey-delete.component';

describe('SurveyDeleteComponent', () => {
  let component: SurveyDeleteComponent;
  let fixture: ComponentFixture<SurveyDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
