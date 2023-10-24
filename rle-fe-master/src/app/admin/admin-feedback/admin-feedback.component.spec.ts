import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Rx from 'rxjs';
import { AdminFeedbackComponent } from './admin-feedback.component';
import { AdminModule } from '../admin.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';

describe('AdminFeedbackComponent', () => {
  let component: AdminFeedbackComponent;
  let fixture: ComponentFixture<AdminFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeedbackComponent ],
      imports:[AdminModule,HttpClientTestingModule,RouterTestingModule],
      providers:[
        LandingPageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngon init',()=>{
    const fixture = TestBed.createComponent(AdminFeedbackComponent);
  const component = fixture.debugElement.componentInstance;
  spyOn(component, 'getAllFeedback').and.returnValue(Rx.of([]));
  component.ngOnInit();
  expect(component.getAllFeedback).toHaveBeenCalled();
  });
});
