import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AdminPeopleComponent } from './admin-people.component';
import { PeopleService } from 'src/app/services/people/people.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminModule } from '../admin.module';


describe('AdminPeopleComponent',()=>{
  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        AdminModule
      ],
      declarations:[
        AdminPeopleComponent
      ],
      providers:[
        PeopleService,
      ]
    }).compileComponents();
  }));
  it('should create the app',()=>{
    const fixture = TestBed.createComponent(AdminPeopleComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call ngon init',()=>{
    const fixture = TestBed.createComponent(AdminPeopleComponent);
    const component = fixture.debugElement.componentInstance;
    let spy_getAllLabMemberDetails = spyOn(component,"getAllLabMemberDetails").and.returnValue([]);
    component.ngOnInit();
    expect(component.getAllLabMemberDetails()).toEqual([]);
  })
})
