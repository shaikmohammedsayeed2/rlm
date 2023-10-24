import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// describe('LayoutComponent', () => {
//   let component: LayoutComponent;
//   let fixture: ComponentFixture<LayoutComponent>;
  

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ LayoutComponent, HeaderComponent,FooterComponent ],
//       imports: [ 
//         RouterTestingModule,
//         HttpClientModule,
//         ToastrModule.forRoot(),
//       ],
//     })
//     .compileComponents();
//   });

//   beforeEach(()=> {
//     fixture = TestBed.createComponent(LayoutComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
