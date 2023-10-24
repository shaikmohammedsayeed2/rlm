import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import * as Rx from 'rxjs';
import { AdminProfileComponent } from './admin-profile.component';
import { PeopleService } from 'src/app/services/people/people.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminModule } from '../admin.module';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';


describe('AdminProfileComponent',()=>{
    beforeEach(async(()=>{
      TestBed.configureTestingModule({
        imports:[
          RouterTestingModule,
          HttpClientTestingModule,
          AdminModule,
          ToastrModule.forRoot()
        ],
        declarations:[
            AdminProfileComponent
        ],
        providers:[
          PeopleService,
          CookieService,
          ToastrService
        ]
      }).compileComponents();
    }));
    it('should create the app',()=>{
      const fixture = TestBed.createComponent(AdminProfileComponent);
      const component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
    });
  
  
  })