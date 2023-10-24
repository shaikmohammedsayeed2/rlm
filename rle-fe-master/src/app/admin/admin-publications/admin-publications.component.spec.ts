import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AdminPublicationsComponent } from './admin-publications.component';
import { ResearchService } from 'src/app/services/research/research.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminModule } from '../admin.module';


describe('AdminPublicationsComponent',()=>{
    beforeEach(async(()=>{
      TestBed.configureTestingModule({
        imports:[
          RouterTestingModule,
          HttpClientTestingModule,
          AdminModule
        ],
        declarations:[
            AdminPublicationsComponent
        ],
        providers:[
            ResearchService,
        ]
      }).compileComponents();
    }));
    it('should create the app',()=>{
      const fixture = TestBed.createComponent(AdminPublicationsComponent);
      const component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
    });
  
    it('should call ngon init',()=>{
      const fixture = TestBed.createComponent(AdminPublicationsComponent);
      const component = fixture.debugElement.componentInstance;
      let spy_getAllPublications = spyOn(component,"getAllPublications").and.returnValue([]);
      component.ngOnInit();
      expect(component.getAllPublications()).toEqual([]);
    })
  })
 