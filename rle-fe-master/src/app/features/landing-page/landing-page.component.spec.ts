import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeaturesModule } from '../features.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryModule } from 'ng-gallery';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';



class MockLandingPageService {
    getLandingPageDetails(lab_id:any): Observable<any> {
      return of({ id: 1, amogh: 'string' });
  }
  }


  describe('LandingPageComponent', () => {
    let component: LandingPageComponent;
    let fixture: ComponentFixture<LandingPageComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ LandingPageComponent ],
        imports:[
          RouterTestingModule,
          ToastrModule.forRoot(),
          GalleryModule,
          FormsModule,
          ReactiveFormsModule
        ],
        providers:[{
          provide:LandingPageService,useClass:MockLandingPageService
        },
      ]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(LandingPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });