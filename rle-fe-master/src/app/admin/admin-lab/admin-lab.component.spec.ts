import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Rx from 'rxjs';
import { AdminLabComponent } from './admin-lab.component';
import { PeopleService } from 'src/app/services/people/people.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { TableModule } from 'ngx-easy-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AdminLabComponent', () => {
  let component: AdminLabComponent;
  let fixture: ComponentFixture<AdminLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLabComponent ],
      imports:[HttpClientTestingModule,ToastrModule.forRoot(),RouterTestingModule,TableModule,ReactiveFormsModule,FormsModule],
      providers:[PeopleService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngon init',()=>{
    const fixture = TestBed.createComponent(AdminLabComponent);
  const component = fixture.debugElement.componentInstance;
  spyOn(component, 'getAllLabs').and.returnValue(Rx.of([]));
  component.ngOnInit();
  expect(component.getAllLabs).toHaveBeenCalled();
  });
});
