import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin-layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-layout/admin-footer/admin-footer.component';
import { AdminPeopleComponent } from './admin-people/admin-people.component';
import { AdminPublicationsComponent } from './admin-publications/admin-publications.component';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import { AdminGalleryComponent } from './admin-gallery/admin-gallery.component';
import { AdminAdmissionsComponent } from './admin-admissions/admin-admissions.component';
import { RouterModule } from '@angular/router';
import { AdminConferencesComponent } from './admin-conferences/admin-conferences.component';
import { GalleryModule } from 'ng-gallery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { TableModule } from 'ngx-easy-table';
import { FeaturesModule } from '../features/features.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { AdminLabComponent } from './admin-lab/admin-lab.component';



@NgModule({
  declarations: [
   AdminFooterComponent,
   AdminHeaderComponent,
   AdminLayoutComponent,
   AdminPeopleComponent,
   AdminPublicationsComponent,
   AdminLandingPageComponent,
   AdminGalleryComponent,
   AdminAdmissionsComponent,
   AdminConferencesComponent,
   AdminProfileComponent,
   AdminFeedbackComponent,
   AdminLabComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    RouterModule,
    GalleryModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    TableModule,
    FeaturesModule,
    SocialLoginModule ,
  ],
  exports:[]
})
export class AdminModule { }
