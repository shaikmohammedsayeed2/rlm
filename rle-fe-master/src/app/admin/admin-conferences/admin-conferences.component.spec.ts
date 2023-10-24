import { ComponentFixture, TestBed, fakeAsync, tick ,async} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AdminConferencesComponent } from './admin-conferences.component';
import { ResearchService } from 'src/app/services/research/research.service';
import { delay } from 'rxjs';
import * as Rx from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminModule } from '../admin.module';

describe('AdminConferencesComponent',()=>{
  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        AdminModule
      ],
      declarations:[
        AdminConferencesComponent
      ],
      providers:[
        ResearchService,
      ]
    }).compileComponents();
  }));
  it('should create the app',()=>{
    const fixture = TestBed.createComponent(AdminConferencesComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call ngon init',()=>{
    const fixture = TestBed.createComponent(AdminConferencesComponent);
  const component = fixture.debugElement.componentInstance;
  spyOn(component, 'getAllConferences').and.returnValue(Rx.of([]));
  component.ngOnInit();
  expect(component.getAllConferences).toHaveBeenCalled();
  });

})
